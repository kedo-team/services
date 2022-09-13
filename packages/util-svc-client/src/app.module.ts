import { Module } from '@nestjs/common'
import { ClientProxyFactory } from '@nestjs/microservices'
import { AppController } from './app.controller'
import { getServicesTransportConfig } from '@kedo-team/config'
import { getNestJsMicroserviceTransportConfig } from '@kedo-team/util-nestjs'

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
  {
    provide: 'EXT_SERVICES',
    useFactory: () => {
      const svcOptions = getNestJsMicroserviceTransportConfig(
        getServicesTransportConfig()
      )
      return ClientProxyFactory.create(svcOptions)
    }
  }],
})
export class AppModule {}
