import { MovieDb } from "moviedb-promise";

export const moviedb = new MovieDb(process.env["MOVIE_DB"]!);

export const getMovies = async (page: number) => {
  const movies = await moviedb.discoverMovie({
    page: Math.round(page / 2),
    include_video: true,
  });

  return movies.page === page / 2
    ? movies.results?.slice(-10)
    : movies.results?.slice(0, 10);
};

export const getSeries = async (page: number) => {
  const series = await moviedb.discoverTv({
    page: Math.round(page / 2),
  });

  return series.page === page / 2
    ? series.results?.slice(-10)
    : series.results?.slice(0, 10);
};

export const discover = async ({
  type,
  page,
}: {
  type: "movies" | "series";
  page: number;
}) => {
  return type === "movies"
    ? await getMovies(Number(page))
    : type === "series"
    ? await getSeries(Number(page))
    : null;
};

export const search = async ({
  type,
  query,
  page,
}: {
  type: "movies" | "series";
  query: string;
  page: number;
}) => {
  const items =
    type === "movies"
      ? await moviedb.searchMovie({ query, page: Math.round(page / 2) })
      : type === "series"
      ? await moviedb.searchTv({ query, page: Math.round(page / 2) })
      : null;

  return items?.page === page / 2
    ? items.results?.slice(-10)
    : items?.results?.slice(0, 10);
};

export const getItem = async ({ id, type }: { id: string; type: string }) => {
  if (type === "movies") {
    const [info, video] = await Promise.all([
      moviedb.movieInfo({ id: Number(id) }),
      moviedb.movieVideos({ id: Number(id) }),
    ]);
    return { info, video };
  } else if (type === "series") {
    const [info, video] = await Promise.all([
      moviedb.tvInfo({ id: Number(id) }),
      moviedb.tvVideos({ id: Number(id) }),
    ]);
    return { info, video };
  }
};
