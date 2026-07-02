const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { initializeDatabase, getQuery, runQuery, safeQuery } = require('./db');

const app = express();
const PORT = process.env.PORT || 4000;
const ALLOWED_ORIGIN = 'http://localhost:3000';
const JWT_SECRET = process.env.JWT_SECRET || 'supersegurasecret';
const JWT_EXPIRES_IN = '1h';

app.use(
  cors({
    origin: ALLOWED_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'session-secret-1234',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 30
    }
  })
);

function preventSqlInjection(query, params) {
  return safeQuery(query, params);
}

function generateJwt(user) {
  return jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });
}

function requireJwt(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: 'Token JWT não fornecido' });
  }

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(403).json({ error: 'Token JWT inválido' });
    }
    req.user = payload;
    next();
  });
}

function requireRole(role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ error: 'Acesso negado: role insuficiente' });
    }
    next();
  };
}

function validateCsrf(req, res, next) {
  const token = req.headers['x-csrf-token'];
  if (!token || !req.session.csrfToken || token !== req.session.csrfToken) {
    return res.status(403).json({ error: 'Token CSRF inválido ou ausente' });
  }
  next();
}

app.get('/session-info', (req, res) => {
  req.session.visitCount = (req.session.visitCount || 0) + 1;
  req.session.lastVisit = new Date().toISOString();

  res.json({
    sessionId: req.sessionID,
    visitCount: req.session.visitCount,
    lastVisit: req.session.lastVisit,
    tempData: req.session.tempData || null
  });
});

app.post('/session-temp', (req, res) => {
  const { note } = req.body;
  req.session.tempData = note || 'Valor temporário armazenado';
  res.json({ message: 'Dados temporários armazenados na sessão', tempData: req.session.tempData });
});

app.get('/csrf-token', (req, res) => {
  const token = uuidv4();
  req.session.csrfToken = token;
  res.json({ csrfToken: token });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username e senha são obrigatórios' });
  }

  const user = await getQuery('SELECT * FROM users WHERE username = ?', [username]);
  if (!user) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }

  const token = generateJwt(user);
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60
  });

  req.session.user = { id: user.id, username: user.username, role: user.role };
  res.json({ message: 'Login bem-sucedido', token, user: { username: user.username, role: user.role } });
});

app.get('/protected-data', requireJwt, (req, res) => {
  res.json({ message: 'Acesso autorizado com JWT', user: req.user });
});

app.post('/protected-action', requireJwt, validateCsrf, (req, res) => {
  res.json({ message: 'Ação protegida executada', user: req.user, payload: req.body });
});

app.post('/admin-only', requireJwt, requireRole('admin'), (req, res) => {
  res.json({ message: 'Acesso concedido para administrador', user: req.user });
});

app.get('/users', requireJwt, async (req, res) => {
  const users = await preventSqlInjection('SELECT id, username, role FROM users', []);
  res.json(users);
});

app.post('/simulate-csrf-attack', (req, res) => {
  res.json({
    message: 'Este endpoint não exige CSRF, portanto ele imita uma rota vulnerável. Use /protected-action para ver proteção ativa.'
  });
});

app.get('/simulate-csrf-example', (req, res) => {
  const html = `<!DOCTYPE html>
<html>
  <body>
    <h2>Exemplo de ataque CSRF</h2>
    <form method="POST" action="http://localhost:${PORT}/protected-action">
      <input type="hidden" name="amount" value="1000" />
      <button type="submit">Enviar</button>
    </form>
    <p>Sem validação CSRF, um site malicioso pode forçar esta requisição.</p>
  </body>
</html>`;
  res.send(html);
});

app.post('/logout', (req, res) => {
  res.clearCookie('token');
  req.session.destroy(() => {});
  res.json({ message: 'Logout realizado' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
      console.log(`CORS permitido apenas para: ${ALLOWED_ORIGIN}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao inicializar o banco de dados:', error);
    process.exit(1);
  });
