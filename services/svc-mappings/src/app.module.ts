import { Module } from '@nestjs/common'
import { getDynamicModule } from './dynamic.module.factory'
import { IDynamicModuleOptions } from './dynamic.module.options'
import { IMapping } from '@kedo-team/svc-data-model'
import { MemoryStoreProvider } from './providers/memory-store-provider'

/* CONSISTENCY NOTE: app.module is the only place to deal with svc-config */
import { getMappingsServiceConfigForEntity } from '@kedo-team/config'

const bizunits_options: IDynamicModuleOptions<IMapping> = {
  ...getMappingsServiceConfigForEntity('bizunits'),
  storage: new MemoryStoreProvider()
}

@Module({
  imports: [
    getDynamicModule().register(bizunits_options),
    //getDynamicModule().register(employees_pattern)
  ]
})
export class AppModule {}
