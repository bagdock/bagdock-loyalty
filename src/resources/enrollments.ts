import type { HttpClient } from '../client'
import type { Enrollment, CreateEnrollmentParams, ListResponse } from '../types'

export class Enrollments {
  constructor(private client: HttpClient) {}

  async create(params: CreateEnrollmentParams): Promise<Enrollment> {
    return this.client.post('/api/loyalty/enrollments', {
      member_id: params.memberId,
      operator_id: params.operatorId,
      facility_id: params.facilityId,
      enrollment_source: params.enrollmentSource ?? 'api',
      metadata: params.metadata,
    })
  }

  async list(params: { memberId?: string; operatorId?: string; status?: string }): Promise<ListResponse<Enrollment>> {
    return this.client.get('/api/loyalty/enrollments', {
      member_id: params.memberId,
      operator_id: params.operatorId,
      status: params.status,
    })
  }

  async update(id: string, params: { status: 'active' | 'paused' | 'deactivated'; metadata?: Record<string, unknown> }): Promise<Enrollment> {
    return this.client.patch(`/api/loyalty/enrollments/${id}`, params)
  }
}
