// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.rawg.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
        pathname: '/**',
      },
    ],
    unoptimized: true, // ✅ حل نهائي لمشكلة الصور الخارجية (500 error)
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    MONGO_URI: process.env.MONGO_URI || '',
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

