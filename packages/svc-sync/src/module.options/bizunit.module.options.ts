import { getSyncServiceStorageConfig,
         getSyncServiceConfigForEntity } from '@kedo-team/svc-config'
import type { IDynamicModuleOptions } from './IDynamicModuleOptions'
import { IExtBizUnit, IKedoBizUnit } from '@kedo-team/svc-data-model'
import getClientProxy from '../config/client.proxy.factory'


export function getBizunitModuleOptions(): IDynamicModuleOptions<IExtBizUnit, IKedoBizUnit> {
  const clientProxy = getClientProxy()
  const serviceConfig = getSyncServiceConfigForEntity('bizunits')
  return {
    clientProxy,
    storageConfig: getSyncServiceStorageConfig(),
    serviceConfig,
    kedoEntityTranslator: async (extBizunit: IExtBizUnit): Promise<IKedoBizUnit> => {
      const parentId = await clientProxy.getAsyncResult<string>(serviceConfig.patterns.resolveExtId, extBizunit.extParentId)
      return {
        title: extBizunit.extTitle,
        parentId
      }
    }
  }
}
