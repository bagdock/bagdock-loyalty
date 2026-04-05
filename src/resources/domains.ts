import type { HttpClient } from '../client'
import type { CustomDomain, CreateDomainParams, UpdateDomainParams, DomainVerifyResult, ListResponse } from '../types'

export class Domains {
  constructor(private client: HttpClient) {}

  async create(params: CreateDomainParams): Promise<CustomDomain & { verification_token: string; instructions: string }> {
    return this.client.post('/api/loyalty/domains', {
      domain: params.domain,
      not_found_url: params.notFoundUrl,
      expired_url: params.expiredUrl,
    })
  }

  async list(): Promise<ListResponse<CustomDomain>> {
    return this.client.get('/api/loyalty/domains')
  }

  async update(id: string, params: UpdateDomainParams): Promise<CustomDomain> {
    return this.client.patch(`/api/loyalty/domains/${id}`, {
      not_found_url: params.notFoundUrl,
      expired_url: params.expiredUrl,
      is_active: params.isActive,
    })
  }

  async delete(id: string): Promise<{ id: string; deleted: boolean }> {
    return this.client.delete(`/api/loyalty/domains/${id}`)
  }

  async verify(id: string): Promise<DomainVerifyResult> {
    return this.client.post(`/api/loyalty/domains/${id}/verify`)
  }
}
