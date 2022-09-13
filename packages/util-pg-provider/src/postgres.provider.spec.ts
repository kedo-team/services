import { PostgresProvider } from './postgres.provider'
import type { IKedoBizUnit } from '@kedo-team/data-model'
import { getSyncServiceStorageConfig, getSyncServiceConfigForEntity } from '@kedo-team/config'

describe('postgres-provider', () => {
  const dbCfg = getSyncServiceStorageConfig()
  const bizunitCfg = getSyncServiceConfigForEntity('bizunits')
  const dirty_record_prefix = 'kedo-team test suit'
  let provider: PostgresProvider
  let query: string

  beforeAll(() => {
    provider = new PostgresProvider(dbCfg)
    query = bizunitCfg.query
  })

  test('bizunit without id and parent', async () => {

    const bizunit: IKedoBizUnit = {
      title: `${dirty_record_prefix} _ testme-bizunit`
    }

    const res = await provider.query<IKedoBizUnit>(query, [bizunit])
    console.log(res)

    // match with shape
    expect(res).toMatchObject(bizunit)
    // has id
    expect(res.id).toBeDefined()
  })

  test('bizunit without a title should fail', async () => {
    const bizunit = {
      title2: `${dirty_record_prefix} _ testme-bizunit`
    }

    await expect(
      provider.query<IKedoBizUnit>(query, [bizunit])
    ).rejects.toThrow()
  })

  afterAll(()=>{
    provider.pureQuery(`DELETE from app_hidden.company_unit WHERE title like '${dirty_record_prefix}%'`, [])
  })
})
