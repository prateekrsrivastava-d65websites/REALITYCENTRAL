CREATE TABLE IF NOT EXISTS rate_limits (
  key_hash TEXT NOT NULL,
  window_start INTEGER NOT NULL,
  request_count INTEGER NOT NULL DEFAULT 0,
  expires_at INTEGER NOT NULL,
  PRIMARY KEY (key_hash, window_start)
);

CREATE INDEX IF NOT EXISTS idx_rate_limits_expires_at ON rate_limits (expires_at);

CREATE TABLE IF NOT EXISTS marketing_kits (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  generated_json TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
