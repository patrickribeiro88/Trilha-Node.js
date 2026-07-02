const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { logger } = require('./logger');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.send('Socket.io server is running');
});

io.on('connection', (socket) => {
  logger.info('Cliente conectado ao Socket.io', { id: socket.id });

  socket.on('chat message', (msg) => {
    logger.info('Mensagem recebida', { message: msg, id: socket.id });
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    logger.info('Cliente desconectado', { id: socket.id });
  });
});

server.listen(3001, () => {
  logger.info('Servidor Socket.io iniciado na porta 3001');
});
