import { RequestType } from '@kedo-team/svc-data-model'
import { DslPrototype } from '../dsl.prototype'
import { DslPrototypeStorage } from './dsl.prototype.storage'

export class DslPrototypeMemoryStorage implements DslPrototypeStorage {
  private mapStorage = new Map<string, DslPrototype>()

  async get(userId: string, reqType: RequestType): Promise<DslPrototype> {
    const key = JSON.stringify({userId, reqType})

    if (this.mapStorage.has(key) === false) {
      throw new Error(`Requested key not found. ${key}`)
    }

    return this.mapStorage.get(key)!
  }

  async set(userId: string, reqType: RequestType, dsl: DslPrototype): Promise<void> {
    const key = JSON.stringify({userId, reqType})
    // TODO: DSL validation
    this.mapStorage.set(key, dsl)
  }
}
