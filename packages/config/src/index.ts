export * from './interfaces'
import * as I from './interfaces'

const yaml = require('js-yaml')
const fs   = require('fs')

const filePath = `${__dirname}/config.yml`

let configObj = yaml.load(fs.readFileSync(filePath, 'utf8'))

export type EntityName = 'bizunits' | 'employees' | 'vacation' | 'biztrips'

export function getServicesTransportConfig() {
  return configObj.Services.TransportConfig
}


/********************************************************/
/*** EXT DATA SERVICE *****/
export function getExtDataSourceConfigForEntity(entity: EntityName): I.IExternalDataSourceConfig {
  switch (entity) {
    case 'bizunits': return configObj.Services.ExternalDataSources.Bizunits
    case 'employees': return configObj.Services.ExternalDataSources.Employees
    default: throw new Error(`ExtDataSourceConfig: uknown config section name '${entity}'`)
  }
}

/********************************************************/
/*** SYNC SERVICE *****/
export function getSyncServiceStorageConfig(): I.ISyncServiceStorageConfig {
  return configObj.Services.Sync.StorageConfig
}
export function getSyncServiceConfigForEntity(entity: EntityName): I.ISyncServiceConfig {
  switch(entity) {
    case 'bizunits': return configObj.Services.Sync.Bizunits
    case 'employees': return configObj.Services.Sync.Employees
    default: throw new Error(`SyncServiceConfig: uknown config section name '${entity}'`)
  }
}


/********************************************************/
/*** MAPPINGS SERVICE *****/
export function getMappingsServiceConfigForEntity(entity: EntityName): I.IMappingServiceConfig {
  switch(entity) {
    case 'bizunits': return configObj.Services.Mappings.Bizunits
    case 'employees': return configObj.Services.Mappings.Employees
    default: throw new Error(`SyncServiceConfig: uknown config section name '${entity}'`)
  }
}