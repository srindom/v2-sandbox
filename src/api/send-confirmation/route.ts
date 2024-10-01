import { Modules } from "@medusajs/framework/utils"
import { IEventBusModuleService } from "@medusajs/types"

export const POST = async (req, res) => {
  const eventBus: IEventBusModuleService = req.scope.resolve(Modules.EVENT_BUS)

  await eventBus.emit({
    name: "order.placed",
    data: { id: "order_01J940C1XZXYETC70M8VHHWJ6M" },
  })

  res.json({ status: "ok" })
}
