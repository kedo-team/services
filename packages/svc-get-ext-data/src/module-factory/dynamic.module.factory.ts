import type { IExternalDataSourceConfig } from '@kedo-team/svc-config'
import { DynamicModule, Module, Logger } from '@nestjs/common'
import { getControllerClass } from '@kedo-team/util-nestjs'
import { MockEmployeeExtDataSource } from './data-sources/mock-employees-data-source'
import { ExtDataService } from './ext-data.service'

export function getDynamicModule(): any {

  @Module({})
  class ExtDataServiceFactory {
    static register(cfg: IExternalDataSourceConfig): DynamicModule {
      const logger = new Logger('Module Factory')
      logger.verbose('creating module with config: ')
      logger.verbose(cfg)

      const dataSource  = new MockEmployeeExtDataSource()
      const dataService = new ExtDataService(dataSource, cfg.transform)

      const ControllerClass = getControllerClass({
        type: 'message',
        pattern: cfg.eventPattern,
        runner: dataService.do.bind(dataService)
      })

      return {
      module: ExtDataServiceFactory,
      controllers: [
        ControllerClass
      ]
      }
    }
  }
  return ExtDataServiceFactory
}
