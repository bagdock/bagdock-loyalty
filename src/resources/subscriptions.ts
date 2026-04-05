import type { HttpClient } from '../client'
import type { SubscriptionInfo } from '../types'

export class Subscriptions {
  constructor(private client: HttpClient) {}

  async get(): Promise<SubscriptionInfo> {
    return this.client.get('/api/loyalty/subscriptions')
  }

  async reportUsage(params: {
    eventType: string
    module?: string
    count?: number
  }): Promise<{ id: string; recorded: boolean }> {
    return this.client.post('/api/loyalty/subscriptions/usage', {
      event_type: params.eventType,
      module: params.module ?? 'loyalty',
      count: params.count ?? 1,
    })
  }

  async getUsage(): Promise<{ period_start: string; data: { event_type: string; module: string; total_count: number }[] }> {
    return this.client.get('/api/loyalty/subscriptions/usage')
  }
}
