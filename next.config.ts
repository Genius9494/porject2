// next.config.ts
const nextConfig = {
  images: {
    domains: ['media.rawg.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.rawg.io',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
        pathname: '/**',
      },
    ],
    unoptimized: true, // لحل مشاكل الصور الخارجية مؤقتاً
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  env: {
    MONGO_URI: process.env.MONGO_URI || '',
  },

  experimental: {
    optimizePackageImports: ['package-name'],
  },
};

export default nextConfig;











// // next.config.ts
// import { NextConfig } from 'next';

// const nextConfig: NextConfig = {
//   images: {
//     domains: ['res.cloudinary.com', 'media.rawg.io', 'example.com'],
//   },
//   typescript: {
//     ignoreBuildErrors: true,  // إذا كنت بحاجة لتجاهل أخطاء البناء في TypeScript
//   },
//   env: {
//     MONGO_URI: process.env.MONGO_URI || '',  // تأكد من أن البيئة محددة بشكل صحيح
//   },
// };

// export default nextConfig;

