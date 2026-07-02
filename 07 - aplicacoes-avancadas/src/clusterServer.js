const cluster = require('cluster');
const os = require('os');
const express = require('express');
const { logger } = require('./logger');

if (cluster.isPrimary) {
  const cpuCount = os.cpus().length;
  logger.info(`Cluster primary iniciando com ${cpuCount} workers`);

  for (let i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    logger.warn(`Worker ${worker.process.pid} saiu. Reiniciando...`);
    cluster.fork();
  });
} else {
  const app = express();
  const port = 4000 + cluster.worker.id;

  app.get('/', (req, res) => {
    res.json({ pid: process.pid, workerId: cluster.worker.id });
  });

  app.listen(port, () => {
    logger.info(`Worker ${cluster.worker.id} rodando na porta ${port}`);
  });
}
