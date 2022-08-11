export interface ISyncServiceConfig {
  query: string
  patterns: {
    listen:       string
    getExtData:   string
    getMappings:  string
    addMapping:   string
    removeMapping:string
    resolveExtId: string
  }
}
