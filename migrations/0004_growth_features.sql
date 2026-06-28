CREATE TABLE IF NOT EXISTS seller_updates (
  id TEXT PRIMARY KEY,
  listing_id TEXT,
  views INTEGER DEFAULT 0,
  saves INTEGER DEFAULT 0,
  inquiries INTEGER DEFAULT 0,
  showings INTEGER DEFAULT 0,
  objections_json TEXT,
  recommendation TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS agent_voice_profiles (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  name TEXT NOT NULL,
  tone TEXT,
  do_say_json TEXT,
  avoid_json TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS listing_playbooks (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  name TEXT NOT NULL,
  category TEXT,
  steps_json TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS photo_observations (
  id TEXT PRIMARY KEY,
  listing_id TEXT,
  image_url TEXT,
  room_type TEXT,
  features_json TEXT,
  condition_notes_json TEXT,
  caption TEXT,
  objection_risk TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
