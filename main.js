const vercelAnalytics = require("./node_modules/@vercel/analytics/dist/index.js");
const vercelSpeedInsights = require("./node_modules/@vercel/speed-insights/dist//index.js");
if (vercelAnalytics) vercelAnalytics.inject();
if (vercelSpeedInsights) vercelSpeedInsights.injectSpeedInsights();
