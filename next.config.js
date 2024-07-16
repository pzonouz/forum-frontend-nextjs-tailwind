// @type {import('next').NextConfig}
const nextConfig = {
  reactStrictMode: false,
  env: {
    BACKEND_URL: "http://localhost/api/v1/",
  },
};

export default nextConfig;
