/**@type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  reactStrictMode: true,
  trailingSlash: true,
  swcMinify: true,
  // images: {
  //   loader: 'imgix',
  //   path: '/',
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
      {
        protocol: "https",
        hostname:
          "firebasestorage.googleapis.com/v0/b/onetapcorp-d0146.appspot.com",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  transpilePackages: ['mui-tel-input'],
};
export default nextConfig;
