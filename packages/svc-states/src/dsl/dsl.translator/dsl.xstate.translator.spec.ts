import { describe, expect, test, beforeAll } from 'vitest'

import { RequestType } from '@kedo-team/svc-data-model'
import { DslPrototype } from '../dsl.prototype'
import { DslXstateTranslator } from './dsl.xstate.translator'


describe(DslXstateTranslator.name, () => {

  test('should initialize properly', async () => {
    //expect(Promise.resolve(1)).resolves.toBe(1)

    await expect(DslXstateTranslator.getInstance()).resolves.toBeDefined()
  })

  test('should always return the same object', async () => {
    const instance_1 = await DslXstateTranslator.getInstance()
    const instance_2 = await DslXstateTranslator.getInstance()
    expect(instance_1).toBe(instance_2)
  })

  test('should translate well formed yaml 2 xstate fsm', async () => {
    const dslProto =
`СогласованиеРуководителя:
  уровень: 1
  СОГЛАСОВАНА: СогласованиеСотрудника
СогласованиеСотрудника:
  email: antontolkachev@gmail.com`

    const instance = await DslXstateTranslator.getInstance()
    console.log(instance.translate(dslProto))
    expect(instance.translate(dslProto)).not.toBeUndefined()
  })
})
