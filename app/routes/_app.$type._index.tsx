import {
  Link,
  useLoaderData,
  useParams,
  useSearchParams,
} from "@remix-run/react";
import { json, type DataFunctionArgs } from "@vercel/remix";
import { authenticator } from "~/modules/auth.server";
import { discover, moviedb, search } from "~/modules/moviedb.server";

export default function Movies() {
  const { popular, items } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { type } = useParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const next = currentPage + 1;
  const previous = currentPage === 1 ? null : currentPage - 1;

  return (
    <div className="px-4 py-16 flex-1 flex flex-col gap-16 justify-between">
      <h3 className="text-center font-bold text-3xl">{type?.toUpperCase()}</h3>
      <div className="flex flex-col md:flex-row gap-8 w-full">
        {popular ? (
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl text-center font-bold">Top 5</h3>
            <div className="flex flex-wrap justify-center w-full gap-8">
              {popular.map((item) => {
                return <Card item={item} key={item.id} />;
              })}
            </div>
          </div>
        ) : null}
        <div className="flex flex-col gap-4">
          <div className="self-center gap-16 flex justify-between">
            <button
              disabled={!previous}
              onClick={() =>
                setSearchParams({
                  page: String(previous),
                  q: searchParams.get("q") || "",
                })
              }
              className="disabled:text-gray-10 disabled:bg-gray-8 py-2 px-4 rounded bg-gray-12 text-gray-1"
            >
              Previous page
            </button>
            <h3 className="text-2xl text-center font-bold">All</h3>

            <button
              disabled={!next}
              className="disabled:text-gray-10 py-2 px-4 rounded bg-gray-12 text-gray-1"
              onClick={() =>
                setSearchParams(
                  searchParams.get("q")
                    ? {
                        page: String(next),
                        q: searchParams.get("q") || "",
                      }
                    : {
                        page: String(next),
                      }
                )
              }
            >
              Next page
            </button>
          </div>
          <div className="w-full h-fit flex flex-wrap justify-center gap-4">
            {items?.map((item) => {
              return <Card key={item.id} item={item} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function loader({ request, params }: DataFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 1;
  const query = url.searchParams.get("q");

  const { type } = params;

  if (type !== "movies" && type !== "series") {
    throw new Error("404 page not found");
  }

  if (query) {
    const items = await search({ type, query, page });
    return json({ items, popular: null });
  }

  const movie_popular = await moviedb.moviePopular();
  const tv_popular = await moviedb.tvPopular();

  const popular =
    type === "movies" ? movie_popular : type === "series" ? tv_popular : null;

  const items = await discover({ type, page });
  return json({ items, popular: popular?.results?.slice(0, 5) });
}

const Card = ({ item }: { item: any }) => {
  const { type } = useParams();
  const name = item.name || item.title;

  return (
    <Link
      to={"/" + type + "/" + item.id}
      className="w-32 md:w-64 h-fit bg-gray-3 hover:bg-gray-4 overflow-clip rounded-lg border border-gray-7 flex flex-col justify-center"
    >
      <img
        src={"https://image.tmdb.org/t/p/original" + item.poster_path}
        alt={name}
        className="bg-cover"
        loading="eager"
      />
      <h3 className="m-4">{name}</h3>
    </Link>
  );
};
