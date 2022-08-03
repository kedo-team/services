import { IBizUnitMapping, IExtBizUnit, IKedoBizUnit } from './biz-units'
import { IEmployeeMapping, IExtEmployee, IKedoEmployee } from './employee'

export * from './biz-units'
export * from './employee'

/* type helpers */
export type IExtEntity = IExtBizUnit | IExtEmployee
export type IKedoEntity = IKedoBizUnit | IKedoEmployee
export type IMapping = IBizUnitMapping | IEmployeeMapping