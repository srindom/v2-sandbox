const { Modules, loadEnv, defineConfig } = require("@medusajs/utils")

loadEnv(process.env.NODE_ENV, process.cwd())

module.exports = defineConfig({
  // admin: {
  //   vite: (config) => {
  //     return {
  //       ...config,
  //       server: {
  //         ...config.server,
  //         fs: {
  //           ...config.server.fs,
  //           allow: ["."],
  //           strict: false,
  //         },
  //       },
  //     }
  //   },
  // },
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS,
      adminCors: process.env.ADMIN_CORS,
      authCors: process.env.AUTH_CORS,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },
  modules: {
    ["sanity"]: {
      resolve: "./modules/sanity",
      options: {
        api_token: process.env.SANITY_API_TOKEN,
        project_id: process.env.SANITY_PROJECT_ID,
        api_version: new Date().toISOString().split("T")[0],
        dataset: "production",
        studio_url: "https://medusajs.sanity.studio",
        type_map: {
          collection: "medusa_collection",
          category: "medusa_category",
        }
      },
    },
    [Modules.NOTIFICATION]: {
      resolve: "@medusajs/medusa/notification",
      options: {
        providers: [
          {
            resolve: "./modules/resend",
            id: "resend",
            options: {
              channels: ["email"],
              api_key: process.env.RESEND_API_KEY,
            },
          },
        ],
      },
    },
    [Modules.FULFILLMENT]: {
      resolve: "@medusajs/medusa/fulfillment",
      options: {
        providers: [
          {
            resolve: "./modules/test-ful",
            id: "my-fulfillment",
          },
        ],
      },
    },
  },
})
