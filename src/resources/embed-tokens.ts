import type { HttpClient } from '../client'
import type { EmbedToken, CreateEmbedTokenParams, ValidateTokenResult, ListResponse } from '../types'

export class EmbedTokens {
  constructor(private client: HttpClient) {}

  async create(params: CreateEmbedTokenParams): Promise<EmbedToken> {
    return this.client.post('/api/loyalty/embed-tokens', {
      name: params.name,
      scopes: params.scopes,
      environment: params.environment,
      allowed_origins: params.allowedOrigins,
      member_id: params.memberId,
      external_tenant_id: params.externalTenantId,
      expires_at: params.expiresAt,
    })
  }

  async list(): Promise<ListResponse<EmbedToken>> {
    return this.client.get('/api/loyalty/embed-tokens')
  }

  async revoke(id: string, reason?: string): Promise<{ id: string; revoked: boolean }> {
    return this.client.delete(`/api/loyalty/embed-tokens/${id}`, { reason })
  }

  async validate(token: string): Promise<ValidateTokenResult> {
    return this.client.post('/api/public/embed-tokens/validate', { token })
  }
}
