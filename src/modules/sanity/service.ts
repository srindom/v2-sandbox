import {
  ModuleJoinerConfig,
  ProductCategoryDTO,
  ProductCollectionDTO,
  ProductDTO,
} from "@medusajs/types"
import {
  createClient,
  FirstDocumentMutationOptions,
  SanityClient,
} from "@sanity/client"

const SyncDocumentTypes = {
  PRODUCT: "product",
  CATEGORY: "category",
  COLLECTION: "collection",
} as const

type SyncDocumentTypes =
  (typeof SyncDocumentTypes)[keyof typeof SyncDocumentTypes]

type SyncDocumentInputs<T> = T extends "product"
  ? ProductDTO
  : T extends "category"
    ? ProductCategoryDTO
    : T extends "collection"
      ? ProductCollectionDTO
      : never

type SanityOptions = {
  api_token: string
  project_id: string
  api_version: string
  dataset: "production" | "development"
}

type InjectedDependencies = {}

export default class SanityModuleService {
  private client: SanityClient

  constructor({}: InjectedDependencies, options: SanityOptions) {
    this.client = createClient({
      projectId: options.project_id,
      apiVersion: options.api_version,
      dataset: options.dataset,
      token: options.api_token,
    })
  }

  async upsertSyncDocument<T extends SyncDocumentTypes>(
    type: T,
    data: SyncDocumentInputs<T>
  ) {
    const existing = await this.client.getDocument(data.id)
    if (existing) {
      return await this.updateSyncDocument(type, data)
    }

    return await this.createSyncDocument(type, data)
  }

  async createSyncDocument<T extends SyncDocumentTypes>(
    type: T,
    data: SyncDocumentInputs<T>,
    options?: FirstDocumentMutationOptions
  ) {
    const doc = {
      _type: type,
      _id: data.id,
      handle: data.handle,
    }

    return await this.client.create(doc, options)
  }

  async updateSyncDocument<T extends SyncDocumentTypes>(
    type: T,
    data: SyncDocumentInputs<T>
  ) {
    const operations = { set: { handle: data.handle } }

    return await this.client.patch(data.id, operations).commit()
  }

  async deleteSyncDocument<T extends SyncDocumentTypes>(type: T, id: string) {
    return await this.client.delete(id)
  }

  __joinerConfig(): ModuleJoinerConfig {
    return {
      serviceName: "sanity",
      primaryKeys: ["id"],
      linkableKeys: {},
      alias: [
        {
          name: "sanity",
        },
      ],
    }
  }

  async list(filter, config) {
    const data = await this.client.getDocuments(filter.id)

    return data.map((doc) => ({
      id: doc._id,
      ...doc,
    }))
  }
}
