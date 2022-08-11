import { Controller, Get, Req, Request, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices'

@Controller()
export class AppController {
  constructor( @Inject('EXT_SERVICES') private client: ClientProxy,) {}

  @Get('/get*')
  async getServiceResponse(@Req() request: Request) {
    const pattern = request.url.slice(1)
    console.log(pattern)
    try {
      const response = await this.client.send({ cmd: pattern }, {})
      return response
    }
    catch (e) {
      return e
    }
    //return await this.client.send({ cmd: pattern }, {})
  }

  @Get('/req*')
  async publishEvent(@Req() request: Request) {
    const pattern = request.url.slice(1)
    this.client.emit({ cmd: pattern }, {})
    return `pattern ${pattern} emitted\n`
  }

}
