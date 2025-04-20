/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    // optionally set a basePath and assetPrefix if deploying to a subpath
    basePath: '/<repo-name>',
    assetPrefix: '/<repo-name>/',
};

module.exports = nextConfig

export default nextConfig;
