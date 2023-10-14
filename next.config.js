/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
   return [
     {
       source: '/subdomain/:subdomain/:path*', // Match the source URL pattern
       destination: 'http://:subdomain.localhost:3000/:path*', // Rewrite to the desired destination
     },
   ];
  },
};

module.exports = nextConfig;
