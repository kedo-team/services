import { RequestType } from '@kedo-team/svc-data-model'
import { DslPrototype } from '../dsl.prototype'

export abstract class DslPrototypeStorage {
  abstract get(userId: string, reqType: RequestType): Promise<DslPrototype>
  abstract set(userId: string, reqType: RequestType, dsl: DslPrototype): Promise<void>
}
