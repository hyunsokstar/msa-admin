// msa-admin\next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hyun-admin.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img1.daumcdn.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '54.180.175.85',
        port: '3000',
        pathname: '/**',
      }
    ],
    domains: [
      'hyun-admin.s3.ap-northeast-2.amazonaws.com',
      'img1.daumcdn.net',
      'localhost',
      '54.180.175.85'
    ],
    dangerouslyAllowSVG: true,
    unoptimized: true
  }
};

export default nextConfig;