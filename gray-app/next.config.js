const withImages = require('next-images');

const redirects = {
  async redirects() {
    return [
      {
        source: '/general',
        destination: '/general/dashboard',
        permanent: true,
      }
    ];
  }
};

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['xqybgvghopxoczhciphb.supabase.co']
  }
}

module.exports = nextConfig
module.exports = withImages(redirects);
