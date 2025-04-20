/** @type {import('next').NextConfig} */

/*

// Dev
const nextConfig = {
    basePath: '',
};

*/

// Static site generation (GitHub Pages)
const nextConfig = {
    output: 'export',
    basePath: '/gkorm',
    assetPrefix: '/gkorm/',
};


export default nextConfig;
