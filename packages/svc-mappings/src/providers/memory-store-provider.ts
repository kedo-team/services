import type { IMapping } from '@kedo-team/svc-data-model'
import type { IMappingStorageProvider } from './IMappingStorageProvider'

export class MemoryStoreProvider<T extends IMapping> implements IMappingStorageProvider<T> {
  private _mappings = new Map<string, T>()

  /**
   * returns all the mappings
   * @returns
   */
  async getAll(): Promise<T[]> {
    return [...this._mappings.values()]
  }

  async resolveExtId(extId: string): Promise<string | undefined> {
    console.log('try-resolve ext id', extId)
    if (this._mappings.has(extId)) {
      return this._mappings.get(extId)!.id
    }
    return undefined
  }

  async resolveId(id: string): Promise<string | undefined> {
    const mapping = [...this._mappings.values()].find(map => map.id === id)
    return mapping?.extId
  }

  /**
   * Add new mapping to storage
   * @param mapping entity mapping object
   */
  async add(mapping: T) : Promise<void> {
    this._mappings.set(mapping.extId, mapping)
  }

  async remove(extId: string) : Promise<void> {
    this._mappings.delete(extId)
  }
}
