const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const expressLayouts = require('express-ejs-layouts');
const { body, validationResult } = require('express-validator');
const db = require('./db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout');
app.use(expressLayouts);
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req, res, next) => {
  try {
    const [menuItems] = await db.query('SELECT label, path FROM menu_items ORDER BY sort_order');
    res.locals.menuItems = menuItems;
    next();
  } catch (error) {
    next(error);
  }
});

app.get('/', (req, res) => {
  return res.redirect('/users');
});

app.get('/users', async (req, res, next) => {
  try {
    const [users] = await db.query('SELECT id, name, email, age, role, created_at FROM users ORDER BY created_at DESC');
    return res.render('index', {
      title: 'Lista de Usuários',
      users,
      query: req.query
    });
  } catch (error) {
    next(error);
  }
});

app.get('/users/new', (req, res) => {
  return res.render('new-user', {
    title: 'Cadastrar Usuário',
    values: {},
    errors: []
  });
});

app.post(
  '/users',
  [
    body('name').trim().notEmpty().withMessage('Nome é obrigatório.'),
    body('email').trim().isEmail().withMessage('E-mail inválido.'),
    body('age')
      .optional({ checkFalsy: true })
      .isInt({ min: 1, max: 120 })
      .withMessage('Idade deve ser um número entre 1 e 120.'),
    body('role').trim().notEmpty().withMessage('Função é obrigatória.')
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    const values = {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      role: req.body.role
    };

    if (!errors.isEmpty()) {
      return res.status(422).render('new-user', {
        title: 'Cadastrar Usuário',
        values,
        errors: errors.array()
      });
    }

    try {
      await db.query('INSERT INTO users (name, email, age, role) VALUES (?, ?, ?, ?)', [
        values.name,
        values.email,
        values.age || null,
        values.role
      ]);

      return res.redirect('/users?success=1');
    } catch (error) {
      return res.status(500).render('error', {
        title: 'Erro ao cadastrar usuário',
        message: 'Ocorreu um erro ao salvar o usuário no banco de dados. Tente novamente mais tarde.',
        error
      });
    }
  }
);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('error', {
    title: 'Erro do Servidor',
    message: 'Houve um problema no processamento da requisição.',
    error: err
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
