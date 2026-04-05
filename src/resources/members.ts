import type { HttpClient } from '../client'
import type { LoyaltyMember, CreateMemberParams, ListResponse } from '../types'

export class Members {
  constructor(private client: HttpClient) {}

  async create(params: CreateMemberParams): Promise<LoyaltyMember> {
    return this.client.post('/api/public/members', {
      email: params.email,
      firstName: params.firstName,
      lastName: params.lastName,
      userType: params.userType ?? 'marketplace_user',
      stytchUserId: params.stytchUserId,
      marketplaceUserId: params.marketplaceUserId,
      metadata: params.metadata,
    })
  }

  async get(id: string): Promise<LoyaltyMember> {
    return this.client.get(`/api/v1/members/${id}`)
  }

  async list(params?: { email?: string }): Promise<ListResponse<LoyaltyMember>> {
    return this.client.get('/api/v1/members', params)
  }

  async update(id: string, params: Partial<Pick<LoyaltyMember, 'first_name' | 'last_name' | 'tier'>>): Promise<LoyaltyMember> {
    return this.client.patch(`/api/v1/members/${id}`, params)
  }
}
