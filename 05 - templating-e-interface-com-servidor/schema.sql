-- Crie o banco de dados e as tabelas necessárias para a aplicação
CREATE DATABASE IF NOT EXISTS user_management CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE user_management;

CREATE TABLE IF NOT EXISTS menu_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  label VARCHAR(100) NOT NULL,
  path VARCHAR(255) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(180) NOT NULL UNIQUE,
  age INT NULL,
  role VARCHAR(80) NOT NULL DEFAULT 'Usuário',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT IGNORE INTO menu_items (label, path, sort_order) VALUES
  ('Página Inicial', '/users', 1),
  ('Cadastrar Usuário', '/users/new', 2),
  ('Listar Usuários', '/users', 3);
