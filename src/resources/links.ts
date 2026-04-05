import type { HttpClient } from '../client'
import type { ReferralLink, CreateLinkParams, UpdateLinkParams, ListResponse } from '../types'

export class Links {
  constructor(private client: HttpClient) {}

  async create(params: CreateLinkParams): Promise<ReferralLink> {
    return this.client.post('/api/public/referral-links', {
      userId: params.userId,
      targetUrl: params.targetUrl,
      targetType: params.targetType,
      title: params.title,
      description: params.description,
      campaign: params.campaign,
      source: params.source,
      medium: params.medium,
    })
  }

  async get(id: string): Promise<ReferralLink> {
    return this.client.get(`/api/loyalty/referrals/${id}`)
  }

  async list(params?: { memberId?: string; limit?: number; offset?: number }): Promise<ListResponse<ReferralLink>> {
    return this.client.get('/api/loyalty/referrals', {
      member_id: params?.memberId,
      limit: params?.limit,
      offset: params?.offset,
    })
  }

  async update(id: string, params: UpdateLinkParams): Promise<ReferralLink> {
    return this.client.patch(`/api/loyalty/referrals/${id}`, params)
  }

  async getByCode(code: string): Promise<ReferralLink> {
    return this.client.get(`/api/public/referral-links/code/${code}`)
  }
}
