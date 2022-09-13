import { Module } from '@nestjs/common'
/** app.module is the only place to deal with svc-config **/
import { getExtDataSourceConfigForEntity } from '@kedo-team/config'
import { getDynamicModule } from './app.module.factory'

const emplConfig     = getExtDataSourceConfigForEntity('employees')
const bizunitsConfig = getExtDataSourceConfigForEntity('bizunits')

@Module({
  imports: [
    getDynamicModule().register(bizunitsConfig),
    //getDynamicModule().register(emplConfig),
  ],
})
export class AppModuleConfig {}