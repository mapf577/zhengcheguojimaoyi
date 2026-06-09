CREATE DATABASE IF NOT EXISTS vehicle_export
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE vehicle_export;

CREATE TABLE IF NOT EXISTS app_records (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  store_type VARCHAR(32) NOT NULL,
  record_id VARCHAR(80) NOT NULL,
  sku VARCHAR(120) NULL,
  code VARCHAR(120) NULL,
  dictionary_type VARCHAR(80) NULL,
  row_order INT UNSIGNED NULL,
  payload JSON NOT NULL,
  created_at VARCHAR(40) NULL,
  updated_at VARCHAR(40) NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uniq_store_record (store_type, record_id),
  KEY idx_store_type (store_type),
  KEY idx_store_sku (store_type, sku),
  KEY idx_dictionary (store_type, dictionary_type, code),
  KEY idx_store_order (store_type, row_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS search_tasks (
  id VARCHAR(80) NOT NULL,
  keywords TEXT NOT NULL,
  countries JSON NULL,
  industries JSON NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'active',
  notes TEXT NULL,
  created_at VARCHAR(40) NULL,
  updated_at VARCHAR(40) NULL,
  PRIMARY KEY (id),
  KEY idx_search_tasks_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS leads (
  id VARCHAR(80) NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  country VARCHAR(120) NULL,
  industry VARCHAR(160) NULL,
  score INT NULL,
  contact_email VARCHAR(255) NULL,
  contact_phone VARCHAR(120) NULL,
  contact_website VARCHAR(500) NULL,
  source_url TEXT NULL,
  follow_status VARCHAR(40) NOT NULL DEFAULT 'new',
  search_task_id VARCHAR(80) NULL,
  created_at VARCHAR(40) NULL,
  updated_at VARCHAR(40) NULL,
  PRIMARY KEY (id),
  KEY idx_leads_country (country),
  KEY idx_leads_industry (industry),
  KEY idx_leads_score (score),
  KEY idx_leads_status (follow_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS lead_profiles (
  id VARCHAR(80) NOT NULL,
  lead_id VARCHAR(80) NOT NULL,
  ai_summary TEXT NULL,
  business_type VARCHAR(160) NULL,
  export_fit VARCHAR(120) NULL,
  pain_points JSON NULL,
  recommended_products TEXT NULL,
  score INT NULL,
  raw_json JSON NULL,
  created_at VARCHAR(40) NULL,
  updated_at VARCHAR(40) NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uniq_lead_profiles_lead (lead_id),
  KEY idx_lead_profiles_score (score)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS crawl_results (
  id VARCHAR(80) NOT NULL,
  search_task_id VARCHAR(80) NULL,
  url TEXT NOT NULL,
  title VARCHAR(500) NULL,
  content LONGTEXT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'pending',
  processed_lead_id VARCHAR(80) NULL,
  created_at VARCHAR(40) NULL,
  updated_at VARCHAR(40) NULL,
  PRIMARY KEY (id),
  KEY idx_crawl_results_status (status),
  KEY idx_crawl_results_task (search_task_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS contact_logs (
  id VARCHAR(80) NOT NULL,
  lead_id VARCHAR(80) NOT NULL,
  channel VARCHAR(80) NULL,
  contact_person VARCHAR(160) NULL,
  content TEXT NOT NULL,
  result_status VARCHAR(80) NULL,
  next_follow_up_at VARCHAR(40) NULL,
  created_at VARCHAR(40) NULL,
  updated_at VARCHAR(40) NULL,
  PRIMARY KEY (id),
  KEY idx_contact_logs_lead (lead_id),
  KEY idx_contact_logs_next (next_follow_up_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
