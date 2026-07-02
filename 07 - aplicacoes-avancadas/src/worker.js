const { Worker } = require('worker_threads');
const { logger } = require('./logger');

const worker = new Worker(require.resolve('./worker-task.js'), {
  workerData: { taskName: 'fatorial', number: 10 }
});

worker.on('message', (message) => {
  logger.info('Resultado do worker', message);
});

worker.on('error', (error) => {
  logger.error('Erro no worker', { error: error.message });
});

worker.on('exit', (code) => {
  logger.info(`Worker encerrado com código ${code}`);
});
