import type { IExternalDataSourceConfig } from '@kedo-team/svc-config'
import { DynamicModule, Module } from '@nestjs/common'
import { generateNestController, JobRunner } from '@kedo-team/util-nestjs'
import { EventPattern } from '@nestjs/microservices'

export function getDynamicModule(): any {
  @Module({})
  class ExtDataServiceFactory {
    static register(cfg: IExternalDataSourceConfig): DynamicModule {

      const ControllerClass = generateNestController({
        type: 'message',
        pattern: cfg.eventPattern,
        runner: () => { return 'alright'},
        //methodName: JobRunner.apply.name
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
