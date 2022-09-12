import { FsmEvent } from './'

export abstract class FsmInstance {
  abstract sendEvent(e: FsmEvent): Promise<void>
}
