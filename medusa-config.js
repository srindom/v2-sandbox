const { Modules, loadEnv, defineConfig } = require('@medusajs/utils')

loadEnv(process.env.NODE_ENV, process.cwd())

module.exports = defineConfig({
  admin: {
    vite: (config) => {
      return {
        ...config,
        server: {
          ...config.server,
          fs: {
            ...config.server.fs,
            allow: ["."],
            strict: false,
          },
        },
      };
    },
  },
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS,
      adminCors: process.env.ADMIN_CORS,
      authCors: process.env.AUTH_CORS,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  modules: {
    [Modules.FULFILLMENT]: {
      resolve: "@medusajs/fulfillment",
      options: {
        providers: [
          {
            resolve: "./modules/test-ful",
            id: "my-fulfillment"
          }
        ]
      }
    }
  }
})
