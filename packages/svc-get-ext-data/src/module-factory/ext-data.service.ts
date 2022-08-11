import { Injectable } from '@nestjs/common'
import jsonata from 'jsonata'
import { IExternalDataSource } from './data-sources/IExternalDataSource'

@Injectable()
export class ExtDataService {
    constructor(private dataSource: IExternalDataSource,
                private transform: string) { }

    //private logger = new Logger('ExtDataService')

    private expression = jsonata(this.transform)

    async do() {
        const rawData = await this.dataSource.getData()
        Object.freeze(rawData)
        const result = this.expression.evaluate(rawData)
        return result
    }
}
