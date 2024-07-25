// @type {import('next').NextConfig}
const nextConfig = {
  reactStrictMode: false,
  env: {
    BACKEND_URL: "http://192.168.1.102/api/v1/",
  },
};

export default nextConfig;
