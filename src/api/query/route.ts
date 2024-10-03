import { Query } from "@medusajs/framework"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"

export const POST = async (req, res) => {
  const query: Query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const { data } = await query.graph({
    entity: "product",
    fields: ["id", "sanity_product.*"],
    pagination: { skip: 0, take: 1 },
  })

  res.json({ data })
}
