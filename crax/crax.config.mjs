/** @typedef {import('.crax/types/config.types.ts').CraxConfig} CraxConfig */

/** @type {CraxConfig} */
const config = {
  siteUrl: 'https://craxjs.js.org', // Change to your actual site URL
  ssg: {
    enabled: true,
    robots: {
      disallow: ['/admin'], // Example disallowed paths
    },
  },
  pwa: {
    enabled: true,
    themeColor: '#ffffff',
    backgroundColor: '#ffffff',
    iconPath: '/logo.png',
    name: 'Crax App',
    shortName: 'Crax',
    startUrl: '/',
    display: 'standalone',
  },
};

export default config;
