/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: () => [
        {
            source: "/backend/:path*",
            destination: `${process.env.BACKEND_URL}/:path*`,
        },
    ],
};

module.exports = nextConfig;
