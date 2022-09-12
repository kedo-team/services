import { RequestType } from '@kedo-team/svc-data-model'
import { DslPrototypeStorage } from './dsl.prototype.storage'
import Keyv from 'keyv'

export class DslPrototypeKeyvStorage implements DslPrototypeStorage {
  private keyv: Keyv

  constructor() {
    this.keyv = new Keyv()
  }

  get(userId: string, reqType: RequestType): Promise<string> {
    throw new Error('Method not implemented.');
  }
  set(userId: string, reqType: RequestType, dsl: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

}