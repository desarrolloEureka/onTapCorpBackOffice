/**@type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  trailingSlash: true,
  swcMinify: true,
  images: {
    loader: 'imgix',
    path: '/',
  },
};
export default nextConfig;
