import { ExternalDataSource } from './ExternalDataSource'
import data from './mock-data/employees'

export class MockEmployeeExtDataSource extends ExternalDataSource {
    async getData(): Promise<any> {
        return Promise.resolve(data)
    }
}
