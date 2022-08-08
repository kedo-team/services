import type { ClientProxyFactory } from '@nestjs/microservices'
import { lastValueFrom } from 'rxjs'

export class ClientProxyWrapper {
  constructor(private _clientproxy: ReturnType<typeof ClientProxyFactory.create>) {}

  async getAsyncResult<T>(cmd: string, payload: any = {}): Promise<T> {
    const extData$ = this._clientproxy.send({ cmd }, {payload})
    return lastValueFrom<T>(extData$)
  }

  async emitEvent(cmd: string, payload: any = {}): Promise<void> {
    this._clientproxy.emit({ cmd }, payload)
    return
  }
}
