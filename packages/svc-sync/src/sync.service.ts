import { IKedoEntity, IExtEntity, IMapping } from '@kedo-team/svc-data-model'
import { ClientProxyWrapper } from '@kedo-team/util-nestjs'
import { Injectable, Logger } from '@nestjs/common'
import { AppStorageProvider } from './providers'
import type { KedoEntityTranslator } from './module.options/IDynamicModuleOptions'

//type IteratorBuilder<T> = (entities: T[]) => IterableIterator<T>

@Injectable()
export class SyncService<TExtEntity extends IExtEntity, TMapping extends IMapping, TKedoEntity extends IKedoEntity> {
    constructor(
        private serviceClient: ClientProxyWrapper,
        private storage: AppStorageProvider<TKedoEntity>,
        private getExtDataPattern: string,
        private getMappingPattern: string,
        private _addMappingEvent: string,
        private ext2kedoTranslator: KedoEntityTranslator<TExtEntity, TKedoEntity>
    ) {}

    private logger = new Logger('SyncService')

    async do() {
        this.logger.verbose('start doing a job')

        const extEntities = await this.serviceClient.getAsyncResult<TExtEntity[]>(this.getExtDataPattern)
        this.logger.verbose(`got from ${this.getExtDataPattern} ${extEntities.length} entities`)

        const mappings = await this.serviceClient.getAsyncResult<TMapping[]>(this.getMappingPattern)
        const newEntities = this.getNewEntities(extEntities, mappings)
        this.logger.verbose(`new count: ${newEntities.length}`)

        // if (this.iteratorBuilder) {
        //     newEntities[Symbol.iterator] = () => this.iteratorBuilder(newEntities)
        // }

        for (let entity of newEntities) {
            const newKedoEntity: TKedoEntity = await this.ext2kedoTranslator(entity)
            this.logger.verbose(newKedoEntity)
            const storedEntity = await this.storage.addEntity(newKedoEntity)
            const mapping: IMapping = {
                extId: entity.extId,
                id: storedEntity.id!,
                entity: entity
            }
            this.serviceClient.emitEvent(this._addMappingEvent, mapping)
        }
        //return '123';
    }

    // async syncBizunits() {
    //     const extBizunits = await this.getAsyncServiceResult<IExtBizUnit[]>(cfg.service.ExtData.get.bizunits.eventPattern)
    //     this.logger.verbose(`external bizunits count: ${extBizunits.length}`)

    //     const mappings = await this.getAsyncServiceResult<IBizUnitMapping[]>(cfg.service.Mappings.get.bizunits)

    //     const newBizunits = this.getNewBizunits(extBizunits, mappings)
    //     this.logger.verbose(`new count: ${newBizunits.length}`)
    //     const newRoots = newBizunits.filter(unit => !unit.extParentId)
    //     this.logger.verbose(`root counts: ${newRoots.length}`)
    //     this.persistRootWithChildren(newRoots, newBizunits)
    // }

    // syncEmployees() {
    //     throw new Error("Not implemented")
    // }

    /**
     * Matches all the entities with corresponding mappings by extId
     * @param extEntities
     * @param mappings
     * @returns new entities that missmatch mappings
     */
    protected getNewEntities(extEntities: TExtEntity[], mappings: TMapping[]): TExtEntity[] {
        const newEntities = extEntities.filter(extUnit =>
            // we're interest in units that don't have existing mapping
            mappings.find(m => m.extId === extUnit.extId) === undefined
        )
        return newEntities
    }

    // protected getNewBizunits(extBizunits: IExtBizUnit[], mappings: IBizUnitMapping[]): IExtBizUnit[] {
    //     const newBizUnits = extBizunits.filter(extUnit =>
    //         // we're interest in units don't have existing mapping
    //         mappings.find(m => m.extId === extUnit.extId) === undefined
    //     )
    //     return newBizUnits
    // }

    // persistRootWithChildren(roots: IExtBizUnit[], all:IExtBizUnit[], kedoParentId?: string) {
    //     if (roots.length === 0 ) return

    //     roots.forEach(async root => {
    //         const kedoBizunit: IKedoBizUnit = {
    //             title: root.extTitle,
    //             parentId: kedoParentId
    //         }
    //         const persistentBizunit = await this.storage.putBizunit(kedoBizunit)
    //         const newMapping: IBizUnitMapping = {
    //             id: persistentBizunit.id,
    //             extId: root.extId,
    //         }

    //         this.client.emit({cmd: cfg.service.Mappings.put.bizunits}, newMapping)

    //         // recursevly persist all child
    //         const childBizunits = all.filter(unit => unit.extParentId === root.extId)
    //         this.logger.verbose(`childs: ${childBizunits.length}`)
    //         this.persistRootWithChildren(childBizunits, all, persistentBizunit.id)
    //     })
    // }

}