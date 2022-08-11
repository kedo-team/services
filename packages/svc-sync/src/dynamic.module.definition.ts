import type { IExtEntity, IKedoEntity } from '@kedo-team/svc-data-model';
import { ConfigurableModuleBuilder } from '@nestjs/common';
import type { IDynamicModuleOptions } from './module.options/IDynamicModuleOptions'

export const { ConfigurableModuleClass,
               MODULE_OPTIONS_TOKEN } =
    new ConfigurableModuleBuilder<IDynamicModuleOptions<IExtEntity, IKedoEntity>>().build();
