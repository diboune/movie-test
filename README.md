# Choices documentation

## UI and styling

1. [React](https://react.dev)
2. [Tailwind](https://tailwindcss.com/) + [Taildix](https://github.com/diboune/taildix) (a package I created to import colors from radix/colors into tailwind)

## Routing and SSR

1. [Remix](https://remix.run) one of the newest js web frameworks based on [React Router](https://reactrouter.com)

## Movie DB package

1. [moviedb-promise](https://github.com/grantholle/moviedb-promise) a package to interact with [TMDB](https://developer.themoviedb.org/docs) using async promises and TypeScript

## Deployment

1. [Vercel](https://vercel.com) edge & serverless hosting with best in class DX

## Auth

I rolled my own auth, to have control on how to implement every detail and also keep the costs the down.

1. [Remix-auth](https://github.com/sergiodxa/remix-auth) & [Remix-auth-form](https://github.com/sergiodxa/remix-auth-form) community packages to help with auth with Remix

## Database

To presist the usernames and the hashed passowrds of my users I needed a Database, so i went with sqlite, it uses sql and it's very easy to use for local development as it's just a file, but for producttion i used:

1. [Turso](https://turso.tech) which is a sqlite host that replicate your db to multiple locations, it's fast and very cheap.
2. [DrizzleOrm](https://orm.drizzle.team) a typescript query builder for sql, fully typesafe and very fast.
