import type { HttpClient } from '../client'

export interface PlatformOperator {
  id: string
  platform_partner_id: string
  operator_id: string
  external_operator_id?: string
  facility_ids?: string[]
  granted_scopes?: string[]
  status: string
  onboarded_at: string
  metadata?: Record<string, any>
}

export interface OnboardOperatorParams {
  operator_id: string
  external_operator_id?: string
  facility_ids?: string[]
  granted_scopes?: string[]
  onboarding_method?: 'oauth' | 'api' | 'manual'
  metadata?: Record<string, any>
  provision_embed_token?: boolean
}

export interface UpdateOperatorParams {
  status?: 'active' | 'suspended' | 'deactivated'
  facility_ids?: string[]
  granted_scopes?: string[]
  external_operator_id?: string
  metadata?: Record<string, any>
}

export interface PlatformAnalytics {
  period: string
  since: string
  operators: number
  active_members: number
  total_events: number
  events_by_type: Array<{ event_type: string; count: number }>
  events_by_operator: Array<{ operator_id: string; events: number }>
}

export interface ProvisionEmbedTokenParams {
  operator_id: string
  name?: string
  scopes?: string[]
  environment?: 'live' | 'test'
  allowed_origins?: string[]
}

export class Platform {
  constructor(private client: HttpClient) {}

  async onboardOperator(params: OnboardOperatorParams) {
    return this.client.post<PlatformOperator & { embed_token?: any; reactivated?: boolean }>(
      '/api/loyalty/platform/operators', params,
    )
  }

  async listOperators(query?: { status?: string; limit?: number; offset?: number }) {
    return this.client.get<{ data: PlatformOperator[]; limit: number; offset: number }>(
      '/api/loyalty/platform/operators', query as any,
    )
  }

  async getOperator(id: string) {
    return this.client.get<PlatformOperator>(`/api/loyalty/platform/operators/${id}`)
  }

  async updateOperator(id: string, params: UpdateOperatorParams) {
    return this.client.patch<PlatformOperator>(`/api/loyalty/platform/operators/${id}`, params)
  }

  async deactivateOperator(id: string) {
    return this.client.delete<{ id: string; operator_id: string; deactivated: boolean }>(
      `/api/loyalty/platform/operators/${id}`,
    )
  }

  async getAnalytics(period?: string) {
    return this.client.get<PlatformAnalytics>('/api/loyalty/platform/analytics', { period })
  }

  async getUsage() {
    return this.client.get<any>('/api/loyalty/platform/usage')
  }

  async provisionEmbedToken(params: ProvisionEmbedTokenParams) {
    return this.client.post<any>('/api/loyalty/platform/embed-tokens', params)
  }

  async getInfo() {
    return this.client.get<any>('/api/loyalty/platform/me')
  }
}
