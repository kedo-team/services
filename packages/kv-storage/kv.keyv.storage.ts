import { KVStorage } from './kv.storage'
import Keyv from 'keyv'

export class KeyvStorage<K ,V> extends KVStorage<K,V> {
  private keyv: Keyv<V>

  constructor(connectionString?: string) {
    super()
    this.keyv = new Keyv<V>(connectionString)
  }

  async get(key: K): Promise<V> {
    const keyStr = this.toString(key)
    const value = await this.keyv.get(keyStr)
    if (!value) {
      throw new Error(`Can't find a value for key: ${keyStr}`)
    }
    return value
  }

  async set(key: K, value: V): Promise<void> {
    const keyStr = this.toString(key)
    this.keyv.set(keyStr, value)
  }
}
