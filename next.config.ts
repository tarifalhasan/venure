import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "s3.amazonaws.com", //s3.amazonaws.com
      },
      {
        protocol: "https",
        hostname: "venue-media-bucket.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "venue-media-bucket.s3.ap-southeast-1.amazonaws.com",
      }
    ],
  },
};

export default nextConfig;
