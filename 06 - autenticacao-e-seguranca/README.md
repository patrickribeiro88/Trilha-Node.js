# Autenticação e Segurança

Exemplo de servidor Express que cobre:

- JWT para autenticação de token
- Sessões temporárias com `express-session`
- CORS restrito a um domínio
- CSRF com token em sessão
- Cookies seguros com `HttpOnly` e `Secure`
- Função de query segura com prepared statements
- Tabela de usuários com roles
- Middleware de autorização por role
- Simulação de ataque CSRF
- Login simples que emite JWT

## Instalação

```bash
npm install
```

## Execução

```bash
npm start
```

## Rotas principais

- `POST /login` - login e emissão de JWT
- `GET /session-info` - dados temporários de sessão
- `POST /session-temp` - salvar dado temporário na sessão
- `GET /csrf-token` - gerar token CSRF
- `GET /protected-data` - rota protegida por JWT
- `POST /protected-action` - rota protegida por JWT + CSRF
- `POST /admin-only` - rota protegida apenas para role `admin`
- `GET /simulate-csrf-example` - exemplo de ataque CSRF

## Usuários fictícios

- admin / Admin@123 (role `admin`)
- user / User@123 (role `user`)
- guest / Guest@123 (role `guest`)
