/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'Access-Control-Allow-Origin',
              value: '*',
            },
          ],
        },
      ];
    },
    experimental: {
      serverActions: {
        allowedOrigins: ['localhost:3000', '.app.github.dev'],
      },
    },
  };
  
  export default nextConfig;