import { Module } from '@nestjs/common'
/** app.module is the only place to deal with svc-config */
import { getExtDataSourceConfigForEntity } from '@kedo-team/svc-config'
import { getDynamicModule } from './module-factory/dynamic.module.factory'

const emplConfig = getExtDataSourceConfigForEntity('employees')
const bizunitsConfig = getExtDataSourceConfigForEntity('bizunits')

@Module({
  imports: [
            getDynamicModule().register(bizunitsConfig),
            getDynamicModule().register(emplConfig),
          ]
})
export class AppModule {}
