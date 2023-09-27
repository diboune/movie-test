import {
  Link,
  Outlet,
  isRouteErrorResponse,
  useRouteError,
  useFetcher,
  useLocation,
  useSearchParams,
  useRouteLoaderData,
} from "@remix-run/react";
import { useState } from "react";

export default function App() {
  const { submit } = useFetcher();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const route = useRouteLoaderData("routes/_app.$type._index");

  return (
    <>
      <header className="flex flex-col md:flex-row gap-4 px-4 items-center justify-between">
        <Link to="/" className="text-3xl font-bold  py-6">
          FlixFlex
        </Link>
        {pathname !== "/login" ? (
          <>
            {route ? (
              <div className="w-full md:w-1/2 flex gap-4 items-center">
                <input
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full py-2 px-8 bg-gray-12 text-gray-1 rounded-lg"
                  type="text"
                  defaultValue={searchParams.get("q") || ""}
                  placeholder="Search"
                />
                <button onClick={() => setSearchParams({ q: query })}>
                  Search
                </button>
              </div>
            ) : null}
            <button
              onClick={() =>
                submit({}, { method: "POST", action: "/api/logout" })
              }
              className="self-end md:self-auto py-2 px-8 bg-gray-12 text-gray-1 rounded-lg w-fit"
            >
              Logout
            </button>
          </>
        ) : null}
      </header>
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div className="flex-1 flex flex-col gap-6 justify-center items-center">
        <h1>Error</h1>
        <p className="text-red-11">{error.message}</p>
        <Link to="/" className="py-2 px-8 bg-gray-12 text-gray-1 rounded-lg">
          Go to hompage
        </Link>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
