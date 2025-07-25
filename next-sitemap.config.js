/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://neuro-learn.vercel.app",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/*", "/admin/*", "/setari/*"],
      },
    ],
    additionalSitemaps: ["https://neuro-learn.vercel.app/sitemap-lessons.xml"],
  },
  exclude: ["/api/*", "/admin/*", "/server-sitemap.xml"],
  generateIndexSitemap: true,
  outDir: "public",
}
