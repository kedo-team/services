import { Controller, Injectable, Logger } from '@nestjs/common'
import { MessagePattern, EventPattern } from '@nestjs/microservices'
import { trace } from '@kedo-team/tracer'

const logger = new Logger('Controller Factory')

export function generateNestController(options: ControllerOptions): any {
  @Controller()
  class MicroserviceControllerMessage {
    constructor(private jobRunner: JobRunner) {}

    @MessagePattern({cmd: options.pattern})
    //@trace()
    async doJob(payload?: any) {
      return this.jobRunner.run(payload.payload)
    }
  }

    @Controller()
    class MicroserviceControllerEvent {
      constructor(private jobRunner: JobRunner) {}

      @EventPattern({cmd: options.pattern})
      async doJob(payload?: any) {
        return this.jobRunner.run(payload.payload)
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
    runner?: (...args) => any
}

@Injectable()
export abstract class JobRunner {
  abstract run(payload: any): Promise<any>
}