const { Worker } = require('worker_threads');
const { logger } = require('./logger');

function runBackgroundTask() {
  const worker = new Worker(require.resolve('./worker-task.js'), {
    workerData: { taskName: 'monitoramento', number: 12 }
  });

  worker.on('message', (message) => {
    logger.info('Tarefa em segundo plano concluída', message);
  });

  worker.on('error', (error) => {
    logger.error('Erro no monitoramento', { error: error.message });
  });
}

runBackgroundTask();
