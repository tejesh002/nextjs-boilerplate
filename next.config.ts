import type { NextConfig } from "next";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error -- next-pwa does not publish type definitions
import withPWA from "next-pwa";

const isProd = process.env.NODE_ENV === "production";
const isExport = process.env.NEXT_OUTPUT === "export";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {},
  ...(isExport && { output: "export" }),
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: !isProd,
})(nextConfig);
