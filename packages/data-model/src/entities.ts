import { IExtBizUnit, IKedoBizUnit } from './biz-units'
import { IExtEmployee, IKedoEmployee } from './employee'

export type IExtEntity = IExtBizUnit | IExtEmployee
export type IKedoEntity = IKedoBizUnit | IKedoEmployee
