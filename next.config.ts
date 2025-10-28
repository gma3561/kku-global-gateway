import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',

  // Set base path for GitHub Pages (repository name)
  basePath: process.env.NODE_ENV === 'production' ? '/kku-global-gateway' : '',

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Trailing slash for GitHub Pages compatibility
  trailingSlash: true,
};

export default nextConfig;
