import { Controller, Logger } from '@nestjs/common'
import { MessagePattern, EventPattern } from '@nestjs/microservices'


const logger = new Logger('Controller Factory')

export function getControllerClass(options: ControllerOptions): any {
    logger.verbose(`constructing class with pattern: '${options.pattern}'`)

    @Controller()
    class MicroserviceControllerMessage {
      // JobRunner has to resolve with nestjs DI
      constructor(private runner: JobRunnerBase) { }

      @MessagePattern({cmd: options.pattern})
      async doJob() {
        logger.verbose(`doing job for '${options.pattern}'`)
        return this.runner.do()
      }
    }

    @Controller()
    class MicroserviceControllerEvent {
      // JobRunner has to resolve with nestjs DI
      constructor(private runner: JobRunnerBase) { }

      @EventPattern(options.pattern)
      async doJob() {
        logger.verbose(`doing job for '${options.pattern}'`)
        return this.runner.do()
      }
    }

    logger.verbose(`created '${options.type}' controller with pattern '${options.pattern}'`)

    switch (options.type) {
      case 'message': return MicroserviceControllerMessage
      case 'event': return MicroserviceControllerEvent
      default: throw new Error(`Unknown microservice controller type '${options.type}'`)
    }
}

type ControllerType = 'event' | 'message'
type ControllerOptions = {
    type: ControllerType,
    pattern: string
}

export abstract class JobRunnerBase {
  abstract do(): Promise<any>
}
