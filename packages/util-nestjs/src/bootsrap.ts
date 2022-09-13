import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions } from '@nestjs/microservices'
import { getNestJsMicroserviceTransportConfig }from '.'
import { getServicesTransportConfig }from '@kedo-team/config'
import { LoggerService, Logger } from '@nestjs/common'

/**
 * Setup and run microservice with main module
 * @param mainModule MainModule class
 * @param logger logger to use
 */
export function bootstrap(mainModule: any, logger?: LoggerService) {
  const f = async () => {
    const service = await NestFactory.createMicroservice<MicroserviceOptions>(
      mainModule,
      {
        ...getNestJsMicroserviceTransportConfig(
            getServicesTransportConfig()
          ),
        logger,
      }
    )
    //service.
    Logger.log('ending creating service')
    await service.listen();
  }
  f()
}