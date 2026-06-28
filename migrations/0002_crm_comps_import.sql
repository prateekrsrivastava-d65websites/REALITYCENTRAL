CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  listing_id TEXT,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  source TEXT,
  temperature TEXT CHECK (temperature IN ('hot', 'warm', 'cold')) DEFAULT 'warm',
  score INTEGER NOT NULL DEFAULT 0,
  stage TEXT NOT NULL DEFAULT 'new',
  next_action TEXT,
  last_activity_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_leads_stage_score ON leads (stage, score DESC);

CREATE TABLE IF NOT EXISTS comparable_properties (
  id TEXT PRIMARY KEY,
  marketing_kit_id TEXT,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  price INTEGER,
  bedrooms REAL,
  bathrooms REAL,
  square_feet INTEGER,
  property_type TEXT,
  sold_at TEXT,
  source_url TEXT,
  similarity_score REAL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
