import { Link } from "@remix-run/react";
import { type DataFunctionArgs } from "@vercel/remix";
import { authenticator } from "~/modules/auth.server";

export default function App() {
  return (
    <>
      <div className="flex-1 flex flex-col gap-16 justify-center items-center">
        <p>Series or Movies?</p>
        <div className="flex gap-8 flex-col md:flex-row justify-center items-center">
          {["Movies", "Series"].map((type) => {
            return <TypeCard type={type} key={type} />;
          })}
        </div>
      </div>
    </>
  );
}

export async function loader({ request }: DataFunctionArgs) {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
}

const TypeCard = ({ type }: { type: string }) => {
  return (
    <Link
      className="bg-gray-3 hover:bg-gray-4 flex justify-center items-center rounded-md border border-gray-7 hover:border-gray-8 w-64 h-64"
      to={"/" + type.toLowerCase()}
    >
      {type}
    </Link>
  );
};
