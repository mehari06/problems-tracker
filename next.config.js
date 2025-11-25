/** @type {import('next').NextConfig} */
const nextConfig = {
    turbopack: {
        // Set the root directory to fix the lockfile warning
        root: __dirname,
    },
}

module.exports = nextConfig
