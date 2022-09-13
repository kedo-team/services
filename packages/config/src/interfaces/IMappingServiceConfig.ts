export interface IMappingServiceConfig {
  patterns: {
    getAll:       string
    resolveExtId: string
    resolveId:    string
    add:          string
    remove:       string
  }
}