/**
 * Questão 1: Servidor HTTP que responde com "Bem-vindo ao Node.js!"
 * 
 * Para executar:
 * node 01-servidor-http-simples.js
 * 
 * Acesse em seu navegador: http://localhost:3000
 */

const http = require('http');

// Criar servidor HTTP
const servidor = http.createServer((req, res) => {
  // Definir tipo de conteúdo como texto
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  
  // Enviar resposta
  res.end('Bem-vindo ao Node.js!');
});

// Colocar servidor para escutar na porta 3000
const PORT = 3000;
servidor.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log('Pressione Ctrl+C para parar o servidor');
});
