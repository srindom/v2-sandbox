import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
 const query = req.scope.resolve("query")

  await query.graph({
    entity: "cart",
    fields: ["id", "customer_id"],
  })

  res.sendStatus(200);
}
