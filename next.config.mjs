/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    BACKEND_URL: "https://localhost/api/v1/",
  },
};

export default nextConfig;
