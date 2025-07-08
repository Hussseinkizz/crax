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
};

export default config;
