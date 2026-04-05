// ── Configuration ────────────────────────────────────────────────────────────

export interface BagdockLoyaltyConfig {
  apiKey: string
  baseUrl?: string
  /** Default: 3 */
  maxRetries?: number
  /** Default: 30000 */
  timeoutMs?: number
}

// ── Pagination ───────────────────────────────────────────────────────────────

export interface ListParams {
  limit?: number
  offset?: number
}

export interface ListResponse<T> {
  data: T[]
  limit?: number
  offset?: number
}

// ── Members ──────────────────────────────────────────────────────────────────

export interface LoyaltyMember {
  id: string
  email: string
  first_name?: string | null
  last_name?: string | null
  member_type: string
  stytch_user_id?: string | null
  marketplace_user_id?: string | null
  total_points: number
  available_points: number
  lifetime_points: number
  total_referrals: number
  successful_referrals: number
  tier?: string | null
  created_at: string
  updated_at: string
}

export interface CreateMemberParams {
  email: string
  firstName?: string
  lastName?: string
  userType?: 'partner' | 'marketplace_user'
  stytchUserId?: string
  marketplaceUserId?: string
  metadata?: Record<string, unknown>
}

// ── Links ────────────────────────────────────────────────────────────────────

export interface ReferralLink {
  id: string
  member_id: string
  code: string
  target_url?: string | null
  target_type?: string | null
  title?: string | null
  description?: string | null
  domain?: string | null
  referral_url: string
  total_clicks: number
  unique_clicks: number
  is_active: boolean
  created_at: string
}

export interface CreateLinkParams {
  userId: string
  targetUrl?: string
  targetType?: string
  title?: string
  description?: string
  campaign?: string
  source?: string
  medium?: string
}

export interface UpdateLinkParams {
  title?: string
  description?: string
  target_url?: string
  is_active?: boolean
}

// ── Events ───────────────────────────────────────────────────────────────────

export type EventType =
  | 'click' | 'lead' | 'sale' | 'signup' | 'embed_render'
  | 'share' | 'qr_scan' | 'deep_link_open' | 'page_view'
  | 'reward_redeemed' | 'points_earned' | 'referral_completed'

export interface TrackEventParams {
  eventType: EventType
  linkId?: string
  memberId?: string
  operatorId?: string
  referralCode?: string
  valuePence?: number
  currency?: string
  landingPage?: string
  referrer?: string
  metadata?: Record<string, unknown>
}

export interface LoyaltyEvent {
  id: string
  event_type: EventType
  link_id?: string | null
  member_id?: string | null
  operator_id?: string | null
  referral_code?: string | null
  value_pence?: number | null
  currency: string
  ip_country?: string | null
  device_type?: string | null
  browser?: string | null
  os?: string | null
  timestamp: string
}

export interface AnalyticsParams {
  operatorId?: string
  linkId?: string
  period?: string
}

export interface AnalyticsResponse {
  period: string
  since: string
  by_event_type: { event_type: string; count: number; total_value_pence: number }[]
  timeseries: { date: string; events: number; unique_members: number }[]
  top_countries: { country: string; count: number }[]
  devices: { device_type: string; count: number }[]
}

// ── Domains ──────────────────────────────────────────────────────────────────

export interface CustomDomain {
  id: string
  domain: string
  verified: boolean
  verified_at?: string | null
  ssl_status: string
  not_found_url?: string | null
  expired_url?: string | null
  is_active: boolean
  created_at: string
}

export interface CreateDomainParams {
  domain: string
  notFoundUrl?: string
  expiredUrl?: string
}

export interface UpdateDomainParams {
  notFoundUrl?: string | null
  expiredUrl?: string | null
  isActive?: boolean
}

export interface DomainVerifyResult {
  verified: boolean
  ssl_status?: string
  message?: string
}

// ── Embed Tokens ─────────────────────────────────────────────────────────────

export type EmbedScope = 'referrals' | 'points' | 'rewards' | 'analytics' | 'full'

export interface EmbedToken {
  id: string
  token?: string
  token_prefix: string
  name: string
  scopes: EmbedScope[]
  environment: 'live' | 'test'
  allowed_origins: string[]
  expires_at?: string | null
  created_at: string
}

export interface CreateEmbedTokenParams {
  name: string
  scopes: EmbedScope[]
  environment?: 'live' | 'test'
  allowedOrigins?: string[]
  memberId?: string
  externalTenantId?: string
  expiresAt?: string
}

export interface ValidateTokenResult {
  valid: boolean
  operator_id?: string
  scopes?: EmbedScope[]
  environment?: string
  member_id?: string | null
  external_tenant_id?: string | null
  error?: string
}

// ── Enrollments ──────────────────────────────────────────────────────────────

export interface Enrollment {
  id: string
  member_id: string
  operator_id: string
  facility_id?: string | null
  status: 'active' | 'paused' | 'deactivated'
  operator_points: number
  enrolled_at: string
  metadata?: Record<string, unknown>
}

export interface CreateEnrollmentParams {
  memberId: string
  operatorId: string
  facilityId?: string
  enrollmentSource?: string
  metadata?: Record<string, unknown>
}

// ── Subscriptions ────────────────────────────────────────────────────────────

export interface Subscription {
  id: string
  plan_tier: string
  locations_count: number
  status: string
  period_start?: string
  period_end?: string
}

export interface SubscriptionInfo {
  subscription: Subscription | null
  plan_tier: string
  limits: Record<string, number | string>
}

// ── Errors ───────────────────────────────────────────────────────────────────

export class BagdockLoyaltyError extends Error {
  status: number
  code: string
  details?: unknown

  constructor(message: string, status: number, code: string, details?: unknown) {
    super(message)
    this.name = 'BagdockLoyaltyError'
    this.status = status
    this.code = code
    this.details = details
  }
}
