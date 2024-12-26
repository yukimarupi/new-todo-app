import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
// next.config.js
module.exports = {
  experimental: {
    appDir: true, // これが設定されていることを確認
  },
};

export default nextConfig;
