import { getSyncServiceStorageConfig,
         getSyncServiceConfigForEntity } from '@kedo-team/config'
import type { IDynamicModuleOptions } from './IDynamicModuleOptions'
import { IExtBizUnit, IKedoBizUnit } from '@kedo-team/data-model'
import getClientProxy from '../config/client.proxy.factory'

export function getBizunitModuleOptions(): IDynamicModuleOptions<IExtBizUnit, IKedoBizUnit> {
  const clientProxy = getClientProxy()
  const serviceConfig = getSyncServiceConfigForEntity('bizunits')
  return {
    clientProxy,
    storageConfig: getSyncServiceStorageConfig(),
    serviceConfig,
    kedoEntityTranslator: async (extBizunit: IExtBizUnit): Promise<IKedoBizUnit> => {
      console.log('translating with pattern ', extBizunit)
      const parentId = await clientProxy.getAsyncResult<string>(serviceConfig.patterns.resolveExtId, extBizunit.extId)
      return {
        title: extBizunit.extTitle,
        parentId
      }
    }
  }
}
