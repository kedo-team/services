export abstract class KVStorage<K = any, V = any> {

  public abstract get(key: K): Promise<V>
  public abstract set(key: K, value: V): Promise<void>

  protected toString(value: K): string {
    switch (typeof value) {
      case "string": return value
      default: return JSON.stringify(value)
    }
  }
}
