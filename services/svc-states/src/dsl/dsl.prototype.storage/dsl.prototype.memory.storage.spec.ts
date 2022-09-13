import { describe, expect, test, beforeAll } from 'vitest'
import { RequestType } from '@kedo-team/svc-data-model'
import { DslPrototype } from '../dsl.prototype'
import { DslPrototypeMemoryStorage } from './dsl.prototype.memory.storage'
import { DslPrototypeStorage } from './dsl.prototype.storage'

describe(DslPrototypeMemoryStorage.name, () => {
  const user1Id = 'user_1'
  const req1Type: RequestType = 'BUISINESS_TRIP'
  const dsl1: DslPrototype = 'dsl 1 definition'
  const user2Id = 'user_2'
  const req2Type: RequestType = 'VACATION'
  const dsl2: DslPrototype = 'dsl 2 definition'

  let dslStorage: DslPrototypeStorage

  beforeAll(() => {
    dslStorage = new DslPrototypeMemoryStorage()
  })

  test('should save DSLs', async () => {
    expect(dslStorage.set(user1Id, req1Type, dsl1)).resolves.not.toThrow()
    expect(dslStorage.set(user2Id, req2Type, dsl2)).resolves.not.toThrow()
  })

  test('should give them back', async () => {
    expect(dslStorage.get(user1Id, req1Type)).resolves.toBe(dsl1)
    expect(dslStorage.get(user2Id, req2Type)).resolves.toBe(dsl2)
  })

  test('should throws on unknown  key error', async () => {
    expect(dslStorage.get(user1Id, req2Type)).rejects.toThrow()
    expect(dslStorage.get(user2Id, req1Type)).rejects.toThrow()
  })
})
