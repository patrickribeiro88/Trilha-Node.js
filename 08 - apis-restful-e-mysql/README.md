# API RESTful exemplo (MySQL + Express)

Passos rápidos:

- Copie `.env.example` para `.env` e ajuste as credenciais do MySQL.
- Rode `npm install`.
- Crie a tabela `users` no seu banco MySQL:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  email VARCHAR(200) NOT NULL,
  age INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

- Inicie: `npm run dev` ou `npm start`.

Endpoints principais:

- `GET /users` — lista com paginação (`?page=1&limit=10`) e filtro por `name` (`?name=joao`).
- `POST /users` — cria usuário. Body: `{ "name": "Nome", "email": "a@b.com", "age": 30 }`.
- `PUT /users/:id` — atualiza campos permitidos.
- `DELETE /users/:id` — remove registro.
- `GET /docs` — documentação Swagger.

Testando validação (exemplos):

1) Envio com dados inválidos (nome curto):

```bash
curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name":"a","email":"not-an-email"}'
```

Resposta esperada: `400` com detalhes da validação.

2) Atualizar sem body (inválido):

```bash
curl -X PUT http://localhost:3000/users/1 -H "Content-Type: application/json" -d '{}'
```

Resposta esperada: `400` (corpo vazio não é permitido para update).
