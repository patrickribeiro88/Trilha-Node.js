const express = require('express');
const dotenv = require('dotenv');
const usersRouter = require('./routes/users');
const logger = require('./middleware/logger');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

dotenv.config();

const app = express();
app.use(express.json());
app.use(logger);

app.use('/users', usersRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
  console.log(`Docs: http://localhost:${port}/docs`);
});
