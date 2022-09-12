import { describe, test, expect, beforeAll } from 'vitest'
import { KVStorage } from './kv.storage'
import { KVStoragePool } from './kv.storage.pool'

describe(KVStoragePool.name, () => {

  let storagePool: KVStoragePool
  const storageKey = Symbol('test storage key')
  let storageValue: KVStorage

  beforeAll(() => {
    storagePool = new KVStoragePool()
  })

  test('should create a storage and return it', async () => {
    expect((()=> {
      storageValue = storagePool.getStorage<string, string>(storageKey)
      return storageValue
    })()).toBeDefined()
  })

  test('should return the same storage', async () => {
    expect(storagePool.getStorage<string, string>(storageKey)).toEqual(storageValue)
  })
})
