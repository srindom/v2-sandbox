import { AbstractFulfillmentProviderService } from "@medusajs/utils"

class MyFulfillmentProviderService extends AbstractFulfillmentProviderService {
  static identifier = "my-fulfillment-provider"

  async createFulfillment(data, items, order, fulfillment): Promise<any> {
    console.log(fulfillment)
    const str = "test"
    return {}
  }

  async cancelFulfillment(fulfillment): Promise<any> {
    return {}
  }

  async getFulfillmentOptions(): Promise<any> {
    return {}
  }

  async createReturnFulfillment(fulfillment): Promise<any> {
    return {}
  }
}

export default MyFulfillmentProviderService
