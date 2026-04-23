````md
# Deplite

**Feature flags, powered by Solana.**

Deplite is a lightweight SDK that lets you control application features **without redeploying code**, using Solana as a shared on-chain configuration layer.


## Why Deplite?

Traditional feature flag systems rely on centralized backends.

Deplite replaces that with:

- **On-chain state** → globally readable configuration
- **No backend required** → no servers, no infra
- **Instant updates** → apps react without redeploy
- **Composable** → multiple apps can share the same flags

---

## Installation

```bash
npm install deplite
````

---

## Quickstart

```ts
import { createDepliteClient } from "deplite"

const client = createDepliteClient({
  programId: "YOUR_PROGRAM_ID",
  admin: "YOUR_ADMIN_PUBKEY",
})

// read flag
const enabled = await client.get("feature_name")
```

---

## Realtime Updates

```ts
client.subscribe("feature_name", (value) => {
  console.log("updated:", value)
})
```

---

## Core Concepts

### Feature Flags (On-chain)

Each flag is stored as a **Program Derived Account (PDA)** on Solana.

* Deterministic address
* Owned by admin wallet
* Stores:

  * `enabled` (boolean)
  * `admin` (pubkey)
  * `name` (string)

---

### Multi-Tenancy

Each wallet controls its own namespace:

```
PDA = ["feature_flag", admin_pubkey, flag_name]
```

👉 Two users can have the same flag name without collision.

---

### Control Plane

Deplite acts as a **control plane for runtime behavior**:

1. Toggle flag from dashboard
2. State updates on-chain
3. Apps read and react

---

## SDK Reference

### Create Client

```ts
const client = createDepliteClient({
  programId: string,
  admin: string,
  rpc?: string
})
```

---

### Get Flag

```ts
const enabled = await client.get("flag_name")
```

Returns:

* `true` → enabled
* `false` → disabled or not found

---

### Subscribe to Flag

```ts
const unsubscribe = client.subscribe("flag_name", (value) => {
  // handle change
})
```

---

### Unsubscribe

```ts
unsubscribe()
```

---

## How It Works

1. Flags are created via on-chain program
2. State is stored in PDAs
3. SDK reads state via RPC
4. Optional subscriptions listen for changes

---

## Example Use Case

```ts
const enabled = await client.get("version_intelligence")

if (enabled) {
  showNewFeature()
} else {
  showOldUI()
}
```

---

## Demo

* Dashboard: *(your deployed link)*
* Example app: *(xandeum link)*

---

## Why Solana?

Deplite uses Solana because it provides:

* **Shared global state** → one source of truth
* **Verifiability** → all changes are signed transactions
* **No backend maintenance**
* **High throughput & low cost**

---

## Roadmap

* % rollout (progressive delivery)
* user targeting (beta testers)
* faster subscriptions (websocket improvements)
* optional off-chain metadata

---

## Architecture

```
Frontend App
    ↓
Deplite SDK
    ↓
Solana RPC
    ↓
On-chain Program (PDAs)
```

---

Backend system is deployed on solana devnet [here](https://explorer.solana.com/tx/4o21yreJBqHocmZJ2rtNex5gVw9Z4dgmBSqnGpCp553SG61St1htPp3tZyjzAnD6XHPGzDR98FApnEWpfFqxmkrL?cluster=devnet)


