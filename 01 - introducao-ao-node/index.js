const fs = require('fs');
const axios = require('axios');
const chalk = require('chalk');

console.log('Bem-vindo ao Node.js!');
console.log('Versão do Node:', process.version);

// Mensagem com atraso de 3 segundos
setTimeout(() => {
  console.log('Mensagem exibida após 3 segundos');
}, 3000);

// Requisição GET usando axios
async function fetchExample() {
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    console.log('Resposta da API:', res.data);
  } catch (err) {
    console.error(chalk.red('Erro na requisição:'), err.message);
  }
}
fetchExample();

// Mensagem de erro em vermelho com chalk
console.error(chalk.red('Erro: algo deu errado (mensagem em vermelho)'));

// Ler arquivo text.txt e exibir conteúdo
fs.readFile('text.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(chalk.red('Erro ao ler text.txt:'), err.message);
    return;
  }
  console.log('Conteúdo de text.txt:\n' + data);
});

// Função que soma usando callback
function soma(a, b, callback) {
  const resultado = a + b;
  callback(null, resultado);
}

soma(5, 7, (err, total) => {
  if (err) return console.error(chalk.red('Erro na soma:'), err);
  console.log('Soma com callback: ', total);
});

// Ler arquivo JSON com informações de usuário
fs.readFile('user.json', 'utf8', (err, data) => {
  if (err) {
    console.error(chalk.red('Erro ao ler user.json:'), err.message);
    return;
  }
  try {
    const user = JSON.parse(data);
    console.log('Dados do usuário:', user);
  } catch (e) {
    console.error(chalk.red('JSON inválido em user.json:'), e.message);
  }
});

// Exibir data e hora atuais formatadas
const agora = new Date();
console.log('Data e hora atuais:', agora.toLocaleString('pt-BR'));
