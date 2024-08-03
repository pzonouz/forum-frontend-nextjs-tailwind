// @type {import('next').NextConfig}
const nextConfig = {
  reactStrictMode: false,
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    WEBSITE_NAME: process.env.WEBSITE_NAME,
  },
};

export default nextConfig;
