import { DynamicModule, Module, } from '@nestjs/common'
import { getControllerClass, ControllerType } from '@kedo-team/util-nestjs';
import { IMapping } from '@kedo-team/svc-data-model'
import type { IDynamicModuleOptions } from './dynamic.module.options'

// this is need for correctly typings in app.module
abstract class FactoryBase {
  static register<T extends IMapping>(_options: IDynamicModuleOptions<T>): DynamicModule {
    throw new Error('Never should be called! This is type-helper object and there is no reason to call this method on it.')
  }
}

export function getDynamicModule(): typeof FactoryBase {

  @Module({})
  class DynamicModuleFactory extends FactoryBase {
    static register<T extends IMapping>(_options: IDynamicModuleOptions<T>): DynamicModule {
      const controllers = [{
          operation: 'getAll',
        },{
          operation: 'resolveExtId',
        },{
          operation: 'resolveId',
        },{
          type: 'event',
          operation: 'add',
        },{
          type: 'event',
          operation: 'remove'
        }
      ].map(cfg =>  getControllerClass({
        type: cfg.type as ControllerType ?? 'message',
        pattern: _options.patterns[cfg.operation],
        // we need this bind class method to class instance
        // else it will lose this context in controller
        runner:  _options.storage[cfg.operation].bind(_options.storage)
      }))

      return {
        module: DynamicModuleFactory,
        controllers
      }
    }
  }
  return DynamicModuleFactory
}
