import { HttpClient } from './client'
import { Members } from './resources/members'
import { Links } from './resources/links'
import { Events } from './resources/events'
import { Domains } from './resources/domains'
import { EmbedTokens } from './resources/embed-tokens'
import { Enrollments } from './resources/enrollments'
import { Subscriptions } from './resources/subscriptions'
import { Platform } from './resources/platform'
import type { BagdockLoyaltyConfig } from './types'

export class BagdockLoyalty {
  readonly members: Members
  readonly links: Links
  readonly events: Events
  readonly domains: Domains
  readonly embedTokens: EmbedTokens
  readonly enrollments: Enrollments
  readonly subscriptions: Subscriptions
  readonly platform: Platform

  private readonly _client: HttpClient
  private readonly _config: BagdockLoyaltyConfig

  constructor(config: BagdockLoyaltyConfig) {
    this._config = config
    this._client = new HttpClient({
      apiKey: config.apiKey,
      baseUrl: config.baseUrl,
      maxRetries: config.maxRetries,
      timeoutMs: config.timeoutMs,
    })

    this.members = new Members(this._client)
    this.links = new Links(this._client)
    this.events = new Events(this._client)
    this.domains = new Domains(this._client)
    this.embedTokens = new EmbedTokens(this._client)
    this.enrollments = new Enrollments(this._client)
    this.subscriptions = new Subscriptions(this._client)
    this.platform = new Platform(this._client)
  }

  /**
   * Returns a scoped client that sends X-Bagdock-Operator-Id on all requests.
   * Used by platform partners to operate on behalf of a specific operator.
   *
   * @example
   * const loyalty = new BagdockLoyalty({ apiKey: 'pak_live_...' })
   * const storable = loyalty.forOperator('op_storable_uk_001')
   * await storable.members.create({ email: 'tenant@example.com' })
   */
  forOperator(operatorId: string): BagdockLoyalty {
    const scopedClient = this._client.withOperatorId(operatorId)
    const instance = Object.create(BagdockLoyalty.prototype)
    instance._config = this._config
    instance._client = scopedClient
    instance.members = new Members(scopedClient)
    instance.links = new Links(scopedClient)
    instance.events = new Events(scopedClient)
    instance.domains = new Domains(scopedClient)
    instance.embedTokens = new EmbedTokens(scopedClient)
    instance.enrollments = new Enrollments(scopedClient)
    instance.subscriptions = new Subscriptions(scopedClient)
    instance.platform = new Platform(scopedClient)
    return instance
  }
}

export { BagdockLoyaltyError } from './types'
export type {
  BagdockLoyaltyConfig,
  LoyaltyMember,
  CreateMemberParams,
  ReferralLink,
  CreateLinkParams,
  UpdateLinkParams,
  TrackEventParams,
  EventType,
  LoyaltyEvent,
  AnalyticsParams,
  AnalyticsResponse,
  CustomDomain,
  CreateDomainParams,
  UpdateDomainParams,
  DomainVerifyResult,
  EmbedToken,
  EmbedScope,
  CreateEmbedTokenParams,
  ValidateTokenResult,
  Enrollment,
  CreateEnrollmentParams,
  Subscription,
  SubscriptionInfo,
  ListParams,
  ListResponse,
} from './types'
