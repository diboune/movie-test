import { useFetcher } from "@remix-run/react";
import { type DataFunctionArgs } from "@vercel/remix";
import { authenticator } from "~/modules/auth.server";

export default function Index() {
  const { Form } = useFetcher();
  return (
    <div className="flex-1 flex justify-center items-center">
      <Form
        className="flex flex-col items-end gap-2"
        method="post"
        action="/api/login/"
      >
        <input
          className="rounded-lg px-4 py-2 bg-gray-3"
          type="text"
          name="username"
          required
          placeholder="Username"
        />
        <input
          className="rounded-lg px-4 py-2 bg-gray-3"
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="current-password"
          required
        />
        <button className="py-2 px-8 bg-gray-12 text-gray-1 rounded-lg">
          Sign In
        </button>
      </Form>
    </div>
  );
}

export async function loader({ request }: DataFunctionArgs) {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });
}
