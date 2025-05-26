import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/ux-itaqui-vagas',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
