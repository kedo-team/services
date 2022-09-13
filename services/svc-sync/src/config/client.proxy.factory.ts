import { getServicesTransportConfig } from '@kedo-team/config'
import { ClientProxyWrapper, getNestJsMicroserviceTransportConfig } from '@kedo-team/util-nestjs'
import { ClientProxyFactory } from '@nestjs/microservices'

let _clientProxy: ClientProxyWrapper

export default function getClientProxy() {
  return _clientProxy ||  (_clientProxy = createProxy())
}

function createProxy() {
  const transportCfg = getServicesTransportConfig()
  const nestjsTransportCfg = getNestJsMicroserviceTransportConfig(transportCfg)
  const clientProxyFactory = ClientProxyFactory.create(nestjsTransportCfg)
  const clientWrapper = new ClientProxyWrapper(clientProxyFactory)
  return clientWrapper
}