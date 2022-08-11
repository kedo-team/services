import { DynamicModule, Module, Logger } from '@nestjs/common'
import type { IExtEntity, IKedoEntity, IMapping } from '@kedo-team/svc-data-model'
//import type { IExtEntity, IKedoEntity, IMapping } from '@kedo-team/svc-data-model'
import { getControllerClass } from '@kedo-team/util-nestjs'
import { SyncService } from './sync.service'
import type { IDynamicModuleOptions } from './module.options/IDynamicModuleOptions'
import { PostgresStorageProvider } from './providers'


export function getDynamicModule(): any {

  @Module({})
  class DynamicModuleFactory {
    static register<TExtEntity extends IExtEntity, TMapping extends IMapping, TKedoEntity extends IKedoEntity,>(options: IDynamicModuleOptions<TExtEntity, TKedoEntity>): DynamicModule {
      const logger = new Logger('Module Factory')
      logger.verbose('creating dynamic module')

      const storage = new PostgresStorageProvider<TKedoEntity>(options.storageConfig, options.serviceConfig.query)


      const syncServiceCore =
        new SyncService<TExtEntity, TMapping, TKedoEntity>(
              options.clientProxy,
              storage,
              options.serviceConfig.patterns.getExtData,
              options.serviceConfig.patterns.getMappings,
              options.serviceConfig.patterns.addMapping,
              options.kedoEntityTranslator,
        )


      const ControllerClass = getControllerClass({
        type: 'event',
        pattern: options.serviceConfig.patterns.listen,
        runner: syncServiceCore.do.bind(syncServiceCore)
      })

      return {
        module: DynamicModuleFactory,
        controllers: [
          ControllerClass
        ]
      }
    }
  }
  return DynamicModuleFactory
}
