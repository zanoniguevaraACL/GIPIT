/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
     },
    images:{ remotePatterns: [
        {
            protocol: "http",
            hostname: "logo.com"
        },
        {
            protocol:'https',
            hostname:'example.com'
        }
    ]}
};

export default nextConfig;
