/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }
    ],
  },
  async redirects() {
    return [
      {
        source: '/tools/ats-checker',
        destination: '/tools/ats-scanner',
        permanent: true,
      },
      {
        source: '/tools/cap-exempt',
        destination: '/jobs/cap-exempt-directory',
        permanent: true,
      },
      {
        source: '/healthcare',
        destination: '/jobs/nursing-schedule-a-directory',
        permanent: true,
      },
      {
        source: '/nursing',
        destination: '/jobs/nursing-schedule-a-directory',
        permanent: true,
      },
      {
        source: '/tools/w8ben',
        destination: '/tools/w8ben-validator',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
