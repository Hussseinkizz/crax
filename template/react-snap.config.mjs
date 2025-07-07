import crax from './crax.config.mjs';

export default {
  routes: crax.ssg.includedRoutes,
  inlineCss: true,
  puppeteerArgs: ['--no-sandbox'],
};
