import { defineLink } from "@medusajs/framework/utils"
import ProductModule from "@medusajs/medusa/product"

export default defineLink(
  {
    ...ProductModule.linkable.product.id,
    field: "id",
  },
  {
    linkable: {
      serviceName: "sanity",
      primaryKey: "id",
      alias: "sanity_product",
    },
  },
  {
    readOnly: true,
  }
)
