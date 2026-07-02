const { parentPort, workerData } = require('worker_threads');
const { logger } = require('./logger');

function computeFactorial(number) {
  let result = 1;
  for (let i = 2; i <= number; i += 1) {
    result *= i;
  }
  return result;
}

logger.info('Worker thread started', { task: workerData.taskName });

const result = computeFactorial(workerData.number);

parentPort.postMessage({
  task: workerData.taskName,
  input: workerData.number,
  result
});
