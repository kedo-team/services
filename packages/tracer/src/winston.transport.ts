import * as api from "@opentelemetry/api"
import TransportStream from 'winston-transport'

export class TracerTransport extends TransportStream {

  log(info, callback) {
    //console.log(';------------------------')
    setImmediate(() => {
      this.emit('logged', info);
    })
    const span = api.trace.getSpan(api.context.active())
      span?.addEvent(info)
    // Perform the writing to the remote service
    callback()
  }

}
