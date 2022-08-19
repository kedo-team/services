import type { ClientProxyFactory } from '@nestjs/microservices'
import { lastValueFrom } from 'rxjs'

export class ClientProxyWrapper {
  constructor(private _clientproxy: ReturnType<typeof ClientProxyFactory.create>) {}

  async getAsyncResult<T>(cmd: string, payload: any = {}): Promise<T|undefined> {
    const extData$ = this._clientproxy.send({ cmd }, { payload })

    // if stream completes bedfore any values were emitted, the function will reject promise.
    // To avoid this we provide default value so the promise can resolve with it
    // method doc: https://rxjs.dev/api/index/function/lastValueFrom
    return lastValueFrom<T, undefined>(extData$, { defaultValue: undefined })
  }

  async emitEvent(cmd: string, payload: any = {}): Promise<void> {
    this._clientproxy.emit({ cmd }, payload)
    return
  }
}
