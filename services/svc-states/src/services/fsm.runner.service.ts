import { Injectable } from '@nestjs/common'
import { trace      } from '@kedo-team/tracer'
import { JobRunner  } from '@kedo-team/util-nestjs'
import { createMachine } from 'xstate'
import { DslPrototypeProvider } from '../fsm/dsl.prototype.providers'
import { FsmEvent } from './fsm.event'
import { FsmInstanceBuilder } from '../fsm/fsm.instance.builder/fsm.instance.builder'

@Injectable()
export class FsmRunnerProvider extends JobRunner {
  constructor(
    private dslProvider: DslPrototypeProvider,
  ) {
    super()
  }

  @trace
  async run() {}

  @trace
  async createRequest(event: FsmEvent) {
    //  getting fsm instance
    const dslProto = await this.dslProvider.getPrototype(event.emittedByUserId, event.entityType)

    // build FSM for this particular request
    const fsmBuilder = new FsmInstanceBuilder(dslProto)
    const fsm = fsmBuilder.build()

    // send event to FSM
    fsm.sendEvent('Request created')
    await fsm.sendEvent(fsm, event.eventType)

    // saving new state
    this.saveFsmState(fsm)
  }

  @trace
  async sendEventToFsm() {

  }

  @trace
  async getFsmInstance(event: UserEntityEvent): FsmInstance {

  }

  async saveFsmState() {
    const fsm = {
      id: 'do i need one?',
      initial: 'start',
      context:
    }
    return fsm
  }
}

const actions : {
  notifyUser: () => {}
}

