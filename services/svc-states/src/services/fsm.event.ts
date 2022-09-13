import { RequestType } from '@kedo-team/svc-data-model'

export type FsmEvent = {
  emittedByUserId: string
  entityType: RequestType
  entityId?: string
  eventType: 'created' | 'approved' | 'processedByHra' | 'finished'
}
