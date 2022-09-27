/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  target: "experimental-serverless-trace",
  env: {
    TOKEN_SECRET: process.env.TOKEN_SECRET,
  },
};

module.exports = nextConfig;
