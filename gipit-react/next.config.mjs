/** @type {import('next').NextConfig} */
const nextConfig = {
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
