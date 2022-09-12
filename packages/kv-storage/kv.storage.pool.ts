import { KeyvStorage } from './kv.keyv.storage';
import { KVStorage } from './kv.storage';

export class KVStoragePool {
  private storages = new Map<Symbol, KVStorage>()

  public getStorage<K,V>(storageId: Symbol, connectionString?: string): KVStorage<K, V> {
    if (this.storages.has(storageId) === false) {
      const storage = new KeyvStorage<K,V>(connectionString)
      this.storages.set(storageId, storage)
    }
    return this.storages.get(storageId)!
  }
}
