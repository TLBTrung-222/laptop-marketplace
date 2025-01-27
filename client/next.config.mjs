/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname:
                    "laptop-marketplace-se347.s3.ap-southeast-2.amazonaws.com",
            },
        ],
    },
};

export default nextConfig;
