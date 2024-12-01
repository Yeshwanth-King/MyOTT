/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: '10mb', // Increase the body size limit
        },
    },
    images: {
        domains: ["dldsnipsmfbochjlppnb.supabase.co"]
    }
};

export default nextConfig;
