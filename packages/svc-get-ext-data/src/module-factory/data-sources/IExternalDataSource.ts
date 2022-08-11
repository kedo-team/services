export type IExternalDataSource = {
    getData<T>(): Promise<T>
}