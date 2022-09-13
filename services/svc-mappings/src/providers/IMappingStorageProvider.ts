import { IMapping } from '@kedo-team/svc-data-model'

export interface IMappingStorageProvider<T extends IMapping> {
  getAll():                    Promise<T[]>
  resolveExtId(extId: string): Promise<string | undefined>
  resolveId(id: string):       Promise<string | undefined>
  add(mapping: T):             Promise<void>
  remove(extId: string):       Promise<void>
}
