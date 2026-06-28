CREATE TABLE IF NOT EXISTS open_house_attendees (
  id TEXT PRIMARY KEY,
  listing_id TEXT,
  lead_id TEXT,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  buyer_timeline TEXT,
  financing_status TEXT,
  interest_level TEXT CHECK (interest_level IN ('hot', 'warm', 'cold')) DEFAULT 'warm',
  objection TEXT,
  next_action TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_open_house_attendees_listing_interest
  ON open_house_attendees (listing_id, interest_level);

CREATE TABLE IF NOT EXISTS agent_tasks (
  id TEXT PRIMARY KEY,
  listing_id TEXT,
  lead_id TEXT,
  title TEXT NOT NULL,
  stage TEXT,
  due_at TEXT,
  priority TEXT CHECK (priority IN ('high', 'medium', 'low')) DEFAULT 'medium',
  status TEXT CHECK (status IN ('open', 'done', 'snoozed')) DEFAULT 'open',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_agent_tasks_status_due ON agent_tasks (status, due_at);
