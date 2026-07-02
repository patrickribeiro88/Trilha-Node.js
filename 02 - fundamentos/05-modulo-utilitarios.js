/**
 * Questão 5a: Criar um módulo CommonJS que exporta uma função simples
 * 
 * Este arquivo é o módulo que será importado em 05-usar-modulo.js
 */

// Função simples que realiza uma operação
function saudar(nome) {
  return `Olá, ${nome}! Bem-vindo ao Node.js!`;
}

// Função para somar números
function somar(a, b) {
  return a + b;
}

// Função para calcular fatorial
function fatorial(n) {
  if (n <= 1) return 1;
  return n * fatorial(n - 1);
}

// Função para verificar se um número é primo
function ehPrimo(numero) {
  if (numero <= 1) return false;
  if (numero <= 3) return true;
  if (numero % 2 === 0 || numero % 3 === 0) return false;
  
  for (let i = 5; i * i <= numero; i += 6) {
    if (numero % i === 0 || numero % (i + 2) === 0) return false;
  }
  return true;
}

// Objeto com informações do módulo
const info = {
  nome: 'Módulo de Utilitários',
  versao: '1.0.0',
  autor: 'Aluno Node.js'
};

// Exportar funções e objetos usando module.exports
module.exports = {
  saudar,
  somar,
  fatorial,
  ehPrimo,
  info
};

// Alternativa: exportar cada função individualmente
// module.exports.saudar = saudar;
// module.exports.somar = somar;
// module.exports.fatorial = fatorial;
// module.exports.ehPrimo = ehPrimo;
// module.exports.info = info;
