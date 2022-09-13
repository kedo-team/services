import type { IExternalDataSourceConfig } from '@kedo-team/config'
import { DynamicModule, Module } from '@nestjs/common'
import { generateNestController, JobRunner } from '@kedo-team/util-nestjs'
import { MockEmployeeExtDataSource } from './data-sources/mock-employees-data-source'
import { ExtDataService } from './ext-data.service'
import { ExternalDataSource } from './data-sources/ExternalDataSource'
import { TRANSFORM_TOKEN } from './tokens'

export function getDynamicModule(): any {
  @Module({})
  class ExtDataServiceFactory {
    static register(cfg: IExternalDataSourceConfig): DynamicModule {

      const ControllerClass = generateNestController({
        type: 'message',
        pattern: cfg.eventPattern,
      })

      return {
        module: ExtDataServiceFactory,
        controllers: [
          ControllerClass
        ],
        providers: [
          {
            provide: JobRunner,
            useClass: ExtDataService
          },
          {
            provide: ExternalDataSource,
            useClass: MockEmployeeExtDataSource
          },
          {
            provide: TRANSFORM_TOKEN,
            useValue: cfg.transform
          }
        ],
      }
    }
  }
  return ExtDataServiceFactory
}
