```
   ------++                                                 ------++                              ------++#        
  ------+++                                                ------+++                              -----++++        
  ------+++                                                -----++++                              -----+++         
  ------------      ---------      --------------  -------------++++----------      ---------    ------+++-------  
  -------------++ ------------++  --------------+++-------------+++------------+  ------------++ -----+++-----+++++
 ------++++----+++-----+++----+++-----++++-----+++-----+++-----+++-----++++----+++-----+++-----++-----------+++++  
 -----++++------+++-----------+++----++++------++-----++++-----++-----++++------++----++++---++++---------+++++    
 -----+++ -----++-------------++-----+++ ------++----++++ -----++-----+++ ------+-----+++       -----------++      
 -----+++ -----++----++++-----++-----+++ -----+++----++++-----+++-----+++------++-----+++-------------+-----++     
--------------+++----++------+++--------------+++-------------+++-------------++++------------++-----+++-----++    
-------------++++------------++++-------------+++-------------+++ ----------+++++ ----------++++----+++ -----+++   
--++++++++++++++   -+++++++++++++- -++++-----+++   -+++++++++++++    ++++++++++      ++++++++++ -++++++  -+++++++  
                               -------------++++                                                                   
                               -----------+++++                                                                    
                                  +++++++++++                                                                      
```

# @bagdock/loyalty

The official TypeScript SDK for the Bagdock Loyalty API — referrals, rewards, and points for self-storage operators.

[![npm version](https://img.shields.io/npm/v/@bagdock/loyalty.svg)](https://www.npmjs.com/package/@bagdock/loyalty)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Install

```bash
npm install @bagdock/loyalty
```

```bash
yarn add @bagdock/loyalty
```

```bash
pnpm add @bagdock/loyalty
```

```bash
bun add @bagdock/loyalty
```

## Quick start

```typescript
import { BagdockLoyalty } from '@bagdock/loyalty'

const loyalty = new BagdockLoyalty({
  apiKey: 'sk_live_...',
})

// Create a member
const member = await loyalty.members.create({
  email: 'jane@example.com',
  name: 'Jane Doe',
})

// Create a referral link
const link = await loyalty.links.create({
  memberId: member.id,
  campaignId: 'camp_summer2026',
})

// Track an event
await loyalty.events.track({
  memberId: member.id,
  event: 'booking_completed',
  properties: { unitSize: '10x10' },
})
```

## Platform partners

For platforms embedding loyalty on behalf of operators:

```typescript
const platform = new BagdockLoyalty({
  apiKey: 'pak_live_...',
})

const operatorClient = platform.forOperator('opreg_wisestorage')
const members = await operatorClient.members.list()
```

## API reference

### `loyalty.members`

| Method | Description |
|--------|-------------|
| `members.create(params)` | Create a member |
| `members.get(id)` | Get a member by ID |
| `members.update(id, params)` | Update a member |
| `members.list(params?)` | List members |

### `loyalty.links`

| Method | Description |
|--------|-------------|
| `links.create(params)` | Create a referral link |
| `links.get(id)` | Get a link |
| `links.list(params?)` | List links |

### `loyalty.events`

| Method | Description |
|--------|-------------|
| `events.track(params)` | Track a loyalty event |
| `events.list(params?)` | List events |

### `loyalty.enrollments`

| Method | Description |
|--------|-------------|
| `enrollments.create(params)` | Enroll a member in a program |
| `enrollments.get(id)` | Get enrollment details |
| `enrollments.list(params?)` | List enrollments |

### `loyalty.subscriptions`

| Method | Description |
|--------|-------------|
| `subscriptions.create(params)` | Create a subscription |
| `subscriptions.cancel(id)` | Cancel a subscription |
| `subscriptions.list(params?)` | List subscriptions |

### `loyalty.embedTokens`

| Method | Description |
|--------|-------------|
| `embedTokens.create(params)` | Create an embed token |
| `embedTokens.validate(token)` | Validate a token |
| `embedTokens.list(params?)` | List tokens |

### `loyalty.domains`

| Method | Description |
|--------|-------------|
| `domains.create(params)` | Add a custom domain |
| `domains.verify(id)` | Verify a domain |
| `domains.list(params?)` | List domains |

## Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `apiKey` | `string` | — | **Required.** Your Bagdock API key |
| `baseUrl` | `string` | `https://api.bagdock.com` | API base URL |

## License

MIT
