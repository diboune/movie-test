import { type LinkDescriptor } from "@vercel/remix";
import { cssBundleHref } from "@remix-run/css-bundle";
import tailwind from "./tailwind.css";

export default [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: tailwind },
] satisfies LinkDescriptor[];
