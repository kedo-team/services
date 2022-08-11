import type { IExternalDataSource } from './IExternalDataSource'
import data from './mock-data/employees'

export class MockEmployeeExtDataSource implements IExternalDataSource {
    async getData(): Promise<any> {
        return Promise.resolve(data)
    }
}
