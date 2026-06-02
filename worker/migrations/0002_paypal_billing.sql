CREATE TABLE IF NOT EXISTS billing_orders (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  provider TEXT NOT NULL DEFAULT 'paypal',
  provider_order_id TEXT NOT NULL UNIQUE,
  provider_capture_id TEXT,
  package_id TEXT NOT NULL,
  amount_cents INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  credits INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  raw_provider_payload TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  paid_at TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_billing_orders_user_id
ON billing_orders(user_id);

CREATE INDEX IF NOT EXISTS idx_billing_orders_provider_order_id
ON billing_orders(provider_order_id);

CREATE INDEX IF NOT EXISTS idx_billing_orders_status
ON billing_orders(status);

CREATE TABLE IF NOT EXISTS billing_webhook_events (
  id TEXT PRIMARY KEY,
  provider TEXT NOT NULL DEFAULT 'paypal',
  provider_event_id TEXT NOT NULL UNIQUE,
  event_type TEXT NOT NULL,
  provider_order_id TEXT,
  processed INTEGER NOT NULL DEFAULT 0,
  raw_payload TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  processed_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_billing_webhook_events_provider_event_id
ON billing_webhook_events(provider_event_id);

CREATE INDEX IF NOT EXISTS idx_billing_webhook_events_order_id
ON billing_webhook_events(provider_order_id);
