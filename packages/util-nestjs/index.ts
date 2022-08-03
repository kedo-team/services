export * from './bootsrap'
export * from './controller.factory'
export * from './client-proxy.wrapper'

import { Transport } from '@nestjs/microservices'

export function getNestJsMicroserviceTransportConfig(cfg) {
    const { transport: transportStr, options } = cfg
    const transport = getNestJsTransport(transportStr)
    return {
        transport,
        options
    }
}


function getNestJsTransport(transportStr) {
    switch (transportStr) {
      case 'NATS': return Transport.NATS
      case 'TCP': return Transport.TCP
      case 'RabbitMQ': return Transport.RMQ
      default: throw new Error(`Uknown services transport: ${transportStr}`)
    }
}