import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions } from '@nestjs/microservices'
import { getNestJsMicroserviceTransportConfig }from '.'
import { getServicesTransportConfig }from '@kedo-team/svc-config'

/**
 * Setup and run microservice with main module
 * @param mainModule MainModule class
 */
export function bootstrap(mainModule: any) {
  const f = async () => {
    const service = await NestFactory.createMicroservice<MicroserviceOptions>(
        mainModule,
        getNestJsMicroserviceTransportConfig(
          getServicesTransportConfig()
        )
        );
      await service.listen();
  }
  f()
}