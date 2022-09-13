export abstract class ExternalDataSource {
    abstract getData<T>(): Promise<T>
}
