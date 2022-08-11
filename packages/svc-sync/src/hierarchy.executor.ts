// import { IExtBizUnit, IKedoBizUnit, IBizUnitMapping } from '@kedo-team/svc-data-model';
// import { AppStorageProvider } from './providers'

// export default function (newEnties: IExtBizUnit[], storage: AppStorageProvider<IKedoBizUnit>): void {
//     const newRoots = newEnties.filter(entity => !entity.extParentId)
//     persistRootWithChildren(newRoots, newEnties, storage)
// }

// function persistRootWithChildren(roots: IExtBizUnit[], all:IExtBizUnit[], storage: AppStorageProvider<IKedoBizUnit>, kedoParentId?: string,) {
//     if (roots.length === 0 ) return

//     roots.forEach(async root => {
//         const kedoBizunit: IKedoBizUnit = {
//             title: root.extTitle,
//             parentId: kedoParentId
//         }
//         const persistentBizunit = await storage.addEntity(kedoBizunit)
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
