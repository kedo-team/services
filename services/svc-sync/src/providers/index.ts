import type { IKedoEntity } from '@kedo-team/svc-data-model';

export abstract class AppStorageProvider<T extends IKedoEntity> {
    abstract addEntity(entity: T): Promise<T>
}

export * from './postgres-storage-provider'
