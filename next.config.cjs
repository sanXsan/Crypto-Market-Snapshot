/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/.well-known/farcaster.json',
        destination: 'https://api.farcaster.xyz/miniapps/hosted-manifest/01997217-fb18-eda5-cbaf-1ae9757a742f',
        permanent: false, // 307 redirect (temporary)
      },
    ]
  },
}

module.exports = nextConfig
