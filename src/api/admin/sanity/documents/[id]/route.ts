import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import SanityModuleService from "src/modules/sanity/service"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const { id } = (req as any).params

  const sanityModule: SanityModuleService = req.scope.resolve("sanity")
  const [ sanityDocument ] = await sanityModule.list({ id: [id] }, {})

  res.json({ sanity_document: sanityDocument })
}
