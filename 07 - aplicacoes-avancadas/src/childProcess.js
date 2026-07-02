const { spawn } = require('child_process');
const { logger } = require('./logger');

const child = spawn('cmd.exe', ['/c', 'dir'], { cwd: __dirname });

child.stdout.on('data', (data) => {
  logger.info(`Saída do processo filho: ${data.toString()}`);
});

child.stderr.on('data', (data) => {
  logger.error(`Erro do processo filho: ${data.toString()}`);
});

child.on('close', (code) => {
  logger.info(`Processo filho encerrado com código ${code}`);
});
