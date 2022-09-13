import { IExtBizUnit, IMapping } from '@kedo-team/svc-data-model'
import { MemoryStoreProvider } from './memory-store-provider'

describe('svc-mapping: memory-store-provider', () => {
  let provider: MemoryStoreProvider<IMapping>
  const extBizUnit: IExtBizUnit = {
    extId: '123',
    extTitle: 'test-bizunit',
    extVersion: 'version-1'
  }

  beforeEach(() => {
    provider = new MemoryStoreProvider()
  })

  test('should add mapping', async () => {
    const mapping = {
        id: 'kedo-id-1',
        extId: extBizUnit.extId,
        entity: extBizUnit
    }
    provider.add(mapping)
    const mappings = await provider.getAll()
    expect(mappings.some(m => m === mapping)).toBe(true)
  })

})
