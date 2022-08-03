import type { ClientProxyFactory } from '@nestjs/microservices'
import { lastValueFrom } from 'rxjs'

export class ClientProxyWrapper {
  constructor(private clientproxy: ReturnType<typeof ClientProxyFactory.create>) {}

  async getAsyncServiceResult<T>(cmd: string): Promise<T> {
    const extData$ = this.clientproxy.send({ cmd }, {})
    return lastValueFrom<T>(extData$)
  }
}