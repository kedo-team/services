import { Module } from '@nestjs/common'
import { getDynamicModule } from './dynamic.module.factory'
import { getBizunitModuleOptions } from './module.options'

@Module({
  imports: [
    getDynamicModule().register(getBizunitModuleOptions()),
  ],
})
export class AppModule {}
