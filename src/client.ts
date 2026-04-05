import { BagdockLoyaltyError } from './types'

const DEFAULT_BASE_URL = 'https://loyalty-api.bagdock.com'
const DEFAULT_TIMEOUT = 30_000
const DEFAULT_MAX_RETRIES = 3

export interface ClientConfig {
  apiKey: string
  baseUrl: string
  maxRetries: number
  timeoutMs: number
  operatorId?: string
}

export class HttpClient {
  private config: ClientConfig

  constructor(config: Partial<ClientConfig> & { apiKey: string }) {
    this.config = {
      apiKey: config.apiKey,
      baseUrl: (config.baseUrl || DEFAULT_BASE_URL).replace(/\/$/, ''),
      maxRetries: config.maxRetries ?? DEFAULT_MAX_RETRIES,
      timeoutMs: config.timeoutMs ?? DEFAULT_TIMEOUT,
      operatorId: config.operatorId,
    }
  }

  withOperatorId(operatorId: string): HttpClient {
    return new HttpClient({ ...this.config, operatorId })
  }

  async request<T>(method: string, path: string, body?: unknown, query?: Record<string, string | number | undefined>): Promise<T> {
    const url = new URL(path, this.config.baseUrl)
    if (query) {
      for (const [k, v] of Object.entries(query)) {
        if (v !== undefined) url.searchParams.set(k, String(v))
      }
    }

    let lastError: Error | null = null
    const maxAttempts = method === 'GET' ? this.config.maxRetries : 1

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      if (attempt > 0) await sleep(Math.min(1000 * 2 ** attempt, 8000))

      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), this.config.timeoutMs)

      try {
        const res = await fetch(url.toString(), {
          method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}`,
            'User-Agent': '@bagdock/loyalty/0.1.0',
            ...(this.config.operatorId ? { 'X-Bagdock-Operator-Id': this.config.operatorId } : {}),
          },
          body: body ? JSON.stringify(body) : undefined,
          signal: controller.signal,
        })

        clearTimeout(timer)

        if (res.ok) return await res.json() as T

        const errorBody = await res.json().catch(() => ({ error: res.statusText })) as any
        const errorMsg = errorBody?.error?.message || errorBody?.error || errorBody?.message || res.statusText

        if (res.status >= 500 && attempt < maxAttempts - 1) {
          lastError = new BagdockLoyaltyError(errorMsg, res.status, 'SERVER_ERROR')
          continue
        }

        throw new BagdockLoyaltyError(
          errorMsg,
          res.status,
          errorBody?.error?.code || 'API_ERROR',
          errorBody?.error?.details,
        )
      } catch (err) {
        clearTimeout(timer)
        if (err instanceof BagdockLoyaltyError) throw err
        if (err instanceof DOMException && err.name === 'AbortError') {
          lastError = new BagdockLoyaltyError('Request timed out', 408, 'TIMEOUT')
        } else {
          lastError = new BagdockLoyaltyError((err as Error).message, 0, 'NETWORK_ERROR')
        }
        if (attempt >= maxAttempts - 1) throw lastError
      }
    }

    throw lastError || new BagdockLoyaltyError('Request failed', 0, 'UNKNOWN')
  }

  get<T>(path: string, query?: Record<string, string | number | undefined>) {
    return this.request<T>('GET', path, undefined, query)
  }

  post<T>(path: string, body?: unknown) {
    return this.request<T>('POST', path, body)
  }

  patch<T>(path: string, body?: unknown) {
    return this.request<T>('PATCH', path, body)
  }

  delete<T>(path: string, body?: unknown) {
    return this.request<T>('DELETE', path, body)
  }
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
