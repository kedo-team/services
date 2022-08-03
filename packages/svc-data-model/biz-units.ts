export interface IExtBizUnit {
    extId: string,
    /**
     * parent untit id
     * If null it's a root unit
     */
    extParentId?: string,
    extVersion: string,
    extTitle: string
}

export interface IKedoBizUnit {
    /**
     * in case thereis new bizUnit id is null
     */
    id?: string,
    parentId?: string,
    title: string
}

export interface IBizUnitMapping  {
    id: string,
    extId: string
}