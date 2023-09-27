import { type DataFunctionArgs } from "@vercel/remix";
import { authenticator } from "~/modules/auth.server";

export async function action({ request }: DataFunctionArgs) {
  return await authenticator.authenticate("user-pass", request, {
    successRedirect: "/",
    throwOnError: true,
  });
}
