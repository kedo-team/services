import { IMapping } from '@kedo-team/svc-data-model'
import { IMappingStorageProvider } from './providers/IMappingStorageProvider'

export interface IDynamicModuleOptions<T extends IMapping> {
  patterns: {
    getAll: string
    resolveExtId: string
    resolveId: string
    add: string
    remove: string
  }
  storage: IMappingStorageProvider<T>
}
