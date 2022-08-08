import { Controller, Logger } from '@nestjs/common'
import { MessagePattern, EventPattern } from '@nestjs/microservices'


const logger = new Logger('Controller Factory')

export function getControllerClass(options: ControllerOptions): any {

    @Controller()
    class MicroserviceControllerMessage {

      @MessagePattern({cmd: options.pattern})
      async doJob(payload?: any) {
        logger.verbose(`doing job for '${options.pattern}' with payload: ${JSON.stringify(payload.payload)}`)
        // in nestjs input object for message has shape { payload: {} }
        return options.runner(payload.payload)
      }
    }

    @Controller()
    class MicroserviceControllerEvent {

      @EventPattern({cmd: options.pattern})
      async doJob(payload?: any) {
        logger.verbose(`doing job for '${options.pattern}' with payload: ${JSON.stringify(payload)}`)
        return options.runner(payload)
      }
    }

    logger.verbose(`created '${options.type}' controller with pattern '${options.pattern}'`)

    switch (options.type) {
      case 'message': return MicroserviceControllerMessage
      case 'event': return MicroserviceControllerEvent
      default: throw new Error(`Unknown microservice controller type '${options.type}'`)
    }
}

export type ControllerType = 'event' | 'message'
export type ControllerOptions = {
    type: ControllerType,
    pattern: string,
    runner: (...args) => any
}
