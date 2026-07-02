# Express.js + MySQL CRUD

## Como executar

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Crie um arquivo .env com base em .env.example.
3. Crie a tabela no MySQL:
   ```bash
   mysql -u <usuario> -p < .\src\database\schema.sql
   ```
4. Inicie o servidor:
   ```bash
   npm start
   ```

## Rotas disponíveis

- GET / -> Hello, World!
- GET /users -> lista todos os usuários
- POST /users -> cria um usuário
- PUT /users/:id -> atualiza um usuário
- DELETE /users/:id -> remove um usuário
- GET /users/search/:name -> consulta por nome com prepared statement
