import { useLoaderData } from "@remix-run/react";
import { json, type DataFunctionArgs } from "@vercel/remix";
import { authenticator } from "~/modules/auth.server";
import { getItem } from "~/modules/moviedb.server";
import YouTube from "react-youtube";

export default function Item() {
  const { item } = useLoaderData<typeof loader>();
  // @ts-ignore
  const name = item?.info?.name || item?.info?.title;
  const video = item?.video.results?.find(
    (item) => item.type === "Trailer" && item.site === "YouTube"
  );

  return (
    <div className="flex flex-col gap-16 items-center justify-center">
      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="w-3/4 md:w-1/2 text-center [text-wrap:balance]">
        {item?.info.overview}
      </p>

      <div className="w-full md:w-1/2 flex flex-col md:flex-row gap-16 md:gap-8 items-center">
        <img
          className="w-1/2 md:w-1/2 h-auto"
          src={`https://image.tmdb.org/t/p/original/${item?.info?.poster_path}`}
          alt={name}
        />
        {video?.key ? (
          <div className="flex flex-col items-center gap-8">
            <p>Trailer</p>
            <YouTube opts={{ width: 380 }} videoId={video?.key} />
          </div>
        ) : (
          <p>Sorry no Trailer</p>
        )}
      </div>
    </div>
  );
}

export async function loader({ request, params }: DataFunctionArgs) {
  const { type, id } = params;
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  if (typeof type !== "string" || typeof id !== "string") {
    throw new Error("invalid params");
  }
  const item = await getItem({ type, id });

  return json({ item });
}
