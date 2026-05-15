/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      // AWS S3 documents & uploads
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
      },
      // Cloudinary (optional fallback CDN)
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      // UI Avatars
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
    ],
  },

  // Allow server actions (Next.js 14 App Router)
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "apexveritas.com"],
    },
  },

  // Environment variables exposed to the browser
  env: {
    NEXT_PUBLIC_APP_URL:  process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_APP_NAME: "Apex Veritas",
  },
};

module.exports = nextConfig;
