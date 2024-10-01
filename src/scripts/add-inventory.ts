import {
  createInventoryLevelsWorkflow
} from "@medusajs/core-flows";
import {
  ExecArgs,
} from "@medusajs/types";
import {
  Modules,
} from "@medusajs/utils";

export default async function addInventory({ container }: ExecArgs) {
  const inventoryService = container.resolve(Modules.INVENTORY)
  const stockLocationService = container.resolve(Modules.STOCK_LOCATION)

  const locations = await stockLocationService.listStockLocations({})

  let offset = 0
  let hasMore = true
  while (hasMore) {
    const [inventoryItems, count] = await inventoryService.listAndCountInventoryItems({}, {
      relations: ["location_levels"],
      take: 1000,
      skip: offset
    })

    const levelsToCreate = inventoryItems.flatMap(item => {
      if ("location_levels" in item && item.location_levels?.length) {
        return []
      }

      return locations.map(location => ({
        location_id: location.id,
        inventory_item_id: item.id,
        stocked_quantity: Math.floor(Math.random() * 101)
      }))
    })

    await createInventoryLevelsWorkflow(container).run({ input: { inventory_levels: levelsToCreate } })

    offset += 1000
    hasMore = offset > count
  }
}
