import type { ISyncServiceConfig, ISyncServiceStorageConfig } from '@kedo-team/config'
import type { IExtEntity, IKedoEntity } from '@kedo-team/data-model'
import type { ClientProxyWrapper } from '@kedo-team/util-nestjs'

export type KedoEntityTranslator<T extends IExtEntity, U extends IKedoEntity> = (ent: T) => Promise<U>
export type IteratorBuilder<T> = (entities: T[]) => IterableIterator<T>

export interface IDynamicModuleOptions<T extends IExtEntity, U extends IKedoEntity> {
  clientProxy: ClientProxyWrapper
  storageConfig: ISyncServiceStorageConfig
  serviceConfig: ISyncServiceConfig
  kedoEntityTranslator: KedoEntityTranslator<T, U>
  iteratorBuilder?: IteratorBuilder<T>
}
