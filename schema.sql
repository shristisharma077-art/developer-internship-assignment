-- ============================================================
-- schema.sql — MySQL database and table setup
-- Run this once before starting the application.
-- ============================================================

-- Create database
CREATE DATABASE IF NOT EXISTS internship_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE internship_db;

-- ── Users table ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
    id         INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    name       VARCHAR(100)    NOT NULL,
    email      VARCHAR(150)    NOT NULL,
    password   VARCHAR(255)    NOT NULL,          -- bcrypt hash
    created_at DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    UNIQUE KEY uq_email (email)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- ── Optional: verify structure ───────────────────────────────
DESCRIBE users;
