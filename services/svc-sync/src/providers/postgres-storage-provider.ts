import type { IKedoEntity } from '@kedo-team/data-model'
import { Injectable, Logger } from '@nestjs/common'
import { AppStorageProvider } from '.'
import { PostgresProvider } from '@kedo-team/util-pg-provider'
import { ISyncServiceStorageConfig } from '@kedo-team/config'

@Injectable()
export class PostgresStorageProvider<T extends IKedoEntity> extends  AppStorageProvider<T> {
  constructor(private dbConfig: ISyncServiceStorageConfig,
              private query: string) {
    super()
  }

  private db = new PostgresProvider(this.dbConfig)
  private logger = new Logger(PostgresStorageProvider.name)

  async addEntity(entity: T): Promise<T> {
    this.logger.verbose(`saving entity to db: ${JSON.stringify(entity)}`)
    const savedEntity = await this.db.query<T>(this.query, [entity])
    return savedEntity
  }
}
