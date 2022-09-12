import { describe, test, expect, beforeAll } from 'vitest'
import { KeyvStorage } from './kv.keyv.storage'
import { KVStorage } from './kv.storage'

describe(KeyvStorage.name, () => {
  let storage: KVStorage<string, {prop: string}>
  const elements = [
    {
      key: 'key_1',
      value: { prop: 'value_1'}
    },
    {
      key: 'key_2',
      value: { prop: 'value_2'}
    }
  ]

  beforeAll(() => {
    storage = new KeyvStorage<string, {prop: string}>()
  })

  test('shoud save values', async () => {
    for (const el of elements) {
      await expect(storage.set(el.key, el.value)).resolves.not.toThrow()
    }
  })

  test('shoud get the same values', async () => {
    for (const el of elements) {
      await expect(storage.get(el.key)).resolves.toEqual(el.value)
    }
  })

  test('should throws on unknown key', async () => {
    await expect(storage.get('dummy_key_is_eve_here')).rejects.toThrow()
  })
})
