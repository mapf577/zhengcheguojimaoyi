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
  payload JSON NOT NULL,
  created_at VARCHAR(40) NULL,
  updated_at VARCHAR(40) NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uniq_store_record (store_type, record_id),
  KEY idx_store_type (store_type),
  KEY idx_store_sku (store_type, sku),
  KEY idx_dictionary (store_type, dictionary_type, code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
