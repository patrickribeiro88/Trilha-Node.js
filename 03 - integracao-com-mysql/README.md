# Integração Node.js com MySQL

Exemplo simples de integração entre Node.js e MySQL usando `mysql2/promise` e `dotenv`.

## Estrutura do projeto

- `conexao.js` - fluxo de execução principal que testa a conexão, cria, lê, atualiza e exclui um usuário.
- `db.js` - camada de conexão e helper `query` para executar comandos MySQL.
- `usuarios.js` - CRUD de usuários com funções para inserir, listar, buscar por ID, atualizar e deletar.
- `.env.example` - modelo de variáveis de ambiente de conexão com o banco.

## Dependências

- Node.js
- MySQL
- `mysql2`
- `dotenv`

## Como usar

1. Instale as dependências:

```bash
npm install
```

2. Crie um arquivo `.env` na raiz do projeto com as variáveis de conexão:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=meu_banco
```

> Ajuste os valores de acordo com seu ambiente MySQL.

3. Garanta que o banco de dados exista e crie a tabela de usuários:

```sql
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

4. Execute o projeto:

```bash
npm start
```

## O que o script faz

O arquivo `conexao.js` executa o seguinte fluxo:

- testa a conexão com o banco
- cria um novo usuário
- lista todos os usuários
- atualiza o usuário criado
- busca o usuário por ID
- exclui o usuário criado

## Observações

- O projeto usa parâmetros preparados (`?`) em todas as consultas SQL para evitar injeção de SQL.
- Se desejar reutilizar o código, você pode importar as funções de `usuarios.js` em outro script.
