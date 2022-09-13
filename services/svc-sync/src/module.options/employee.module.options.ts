import { ClientProxyFactory } from '@nestjs/microservices'
import { getNestJsMicroserviceTransportConfig,
         ClientProxyWrapper} from '@kedo-team/util-nestjs'
import { getServicesTransportConfig,
         getSyncServiceStorageConfig,
         getSyncServiceConfigForEntity } from '@kedo-team/config'
import type { IDynamicModuleOptions } from './IDynamicModuleOptions'
import { IExtEmployee, IKedoEmployee } from '@kedo-team/data-model'


const employeeServiceConfig = getSyncServiceConfigForEntity('employees')
const commonClientProxy = new ClientProxyWrapper(ClientProxyFactory.create(getNestJsMicroserviceTransportConfig(
  getServicesTransportConfig()
)))
const commonStorageConfig = getSyncServiceStorageConfig()

const employeeModuleOptions: IDynamicModuleOptions<IExtEmployee, IKedoEmployee> = {
  clientProxy: commonClientProxy,
  storageConfig: commonStorageConfig,
  serviceConfig: employeeServiceConfig,
  kedoEntityTranslator: async (extEmployee): Promise<IKedoEmployee> => {


    //console.log(`for extId: ${extBizunit.extId} found id: ${parentId}`)
    return {
      jobTitle: extEmployee.extJobTitle,
      firstName: extEmployee.extFirstName,
      lastName: extEmployee.extLastName,
      middleName: extEmployee.extMiddleName,
      email: 'NA',
      phone: 'NA'
    }
  }
}

export { employeeModuleOptions }
