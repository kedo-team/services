import { Injectable, Inject, Logger } from '@nestjs/common'
import jsonata from 'jsonata'
import { ExternalDataSource } from './data-sources/ExternalDataSource'
import { JobRunner } from '@kedo-team/util-nestjs'
import { TRANSFORM_TOKEN } from './tokens'
import { trace } from '@kedo-team/tracer'

@Injectable()
export class ExtDataService extends JobRunner {
  constructor(
              private dataSource: ExternalDataSource,
              @Inject(TRANSFORM_TOKEN)
              private transform: string,
              ) { super() }

  private readonly expression = jsonata(this.transform)
  private readonly logger = new Logger(ExtDataService.name)

  @trace
  async run() {

    let rawData = await this.getExternalData(this.dataSource)
    this.logger.log('we need to get to jaeger')

    //return rawData
    //Object.freeze(rawData)

    const result = await this.transformResults(rawData)
    return result
  }

  @trace
  private async getExternalData(dataSource: ExternalDataSource): Promise<unknown> {
    return dataSource.getData()
  }

  @trace
  private async transformResults(rawData): Promise<unknown> {
    this.logger.warn('this is a warning')
    return this.expression.evaluate(rawData)
  }
}

