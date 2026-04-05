import type { HttpClient } from '../client'
import type { LoyaltyEvent, TrackEventParams, AnalyticsParams, AnalyticsResponse, ListResponse } from '../types'

export class Events {
  constructor(private client: HttpClient) {}

  async track(params: TrackEventParams): Promise<{ id: string; tracked: boolean }> {
    return this.client.post('/api/loyalty/events', {
      event_type: params.eventType,
      link_id: params.linkId,
      member_id: params.memberId,
      operator_id: params.operatorId,
      referral_code: params.referralCode,
      value_pence: params.valuePence,
      currency: params.currency,
      landing_page: params.landingPage,
      referrer: params.referrer,
      metadata: params.metadata,
    })
  }

  async list(params?: {
    eventType?: string
    linkId?: string
    memberId?: string
    operatorId?: string
    limit?: number
    offset?: number
  }): Promise<ListResponse<LoyaltyEvent>> {
    return this.client.get('/api/loyalty/events', {
      event_type: params?.eventType,
      link_id: params?.linkId,
      member_id: params?.memberId,
      operator_id: params?.operatorId,
      limit: params?.limit,
      offset: params?.offset,
    })
  }

  async analytics(params?: AnalyticsParams): Promise<AnalyticsResponse> {
    return this.client.get('/api/loyalty/events/analytics', {
      operator_id: params?.operatorId,
      link_id: params?.linkId,
      period: params?.period,
    })
  }
}
