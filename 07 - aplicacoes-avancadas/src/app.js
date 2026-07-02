const express = require('express');
const path = require('path');
const { fetchData } = require('./api');
const { logger } = require('./logger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get('/api/data', async (req, res) => {
  try {
    logger.info('Buscando dados da API');
    const data = await fetchData();
    res.json(data);
  } catch (error) {
    logger.error('Erro ao buscar dados da API', { error: error.message });
    res.status(500).json({ error: error.message });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  logger.info(`Servidor HTTP iniciado na porta ${PORT}`);
});
