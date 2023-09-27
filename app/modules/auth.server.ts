import { createCookieSessionStorage } from "@vercel/remix";
import { Authenticator, AuthorizationError } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { eq, type InferSelectModel } from "drizzle-orm";
import pkg from "bcryptjs";
import * as schema from "../database/schema";
import db from "~/database";

const { compare, hash } = pkg;

export let sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: ["s3cr3t_s3cr3t"],
    secure: process.env.NODE_ENV === "production",
  },
});

type User = {
  id: string;
  email: string;
};

export let authenticator = new Authenticator<User>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    let username = form.get("username");
    let password = form.get("password");

    if (typeof username !== "string" || typeof password !== "string") {
      throw new AuthorizationError("Invalid form submission");
    }

    let user = await login({ username, password });

    return user;
  }),
  "user-pass"
);

const { usersTable } = schema;

type SelectUser = InferSelectModel<typeof usersTable>;

export const login = async ({
  username,
  password,
}: {
  username: SelectUser["username"];
  password: SelectUser["password"];
}) => {
  let user = await db.query.usersTable.findFirst({
    where: eq(usersTable.username, username),
  });

  let message = "Unknown error";

  if (!user) {
    const hashedPassword = await hash(password, 10);

    return (
      await db
        .insert(usersTable)
        .values({ username, password: hashedPassword })
        .returning({
          id: usersTable.id,
          email: usersTable.username,
        })
    )[0];
  }

  const isPasswordValid = await compare(password, user.password);

  if (!isPasswordValid) {
    message = "incorrect credentials";
    throw new AuthorizationError(message);
  }

  return { id: user.id, email: user.username };
};
