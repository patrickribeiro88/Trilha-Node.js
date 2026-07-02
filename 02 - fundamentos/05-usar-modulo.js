/**
 * Questão 5b: Importar e usar um módulo CommonJS
 * 
 * Para executar:
 * node 05-usar-modulo.js
 */

// Importar o módulo criado em 05-modulo-utilitarios.js
const utilitarios = require('./05-modulo-utilitarios');

console.log('=== Utilizando Módulo CommonJS ===\n');

// 1. Usar a função saudar
console.log('1. Usando função saudar:');
console.log(`   ${utilitarios.saudar('João')}`);
console.log(`   ${utilitarios.saudar('Maria')}\n`);

// 2. Usar a função somar
console.log('2. Usando função somar:');
console.log(`   5 + 3 = ${utilitarios.somar(5, 3)}`);
console.log(`   10 + 20 = ${utilitarios.somar(10, 20)}\n`);

// 3. Usar a função fatorial
console.log('3. Usando função fatorial:');
console.log(`   Fatorial de 5: ${utilitarios.fatorial(5)}`);
console.log(`   Fatorial de 10: ${utilitarios.fatorial(10)}\n`);

// 4. Usar a função ehPrimo
console.log('4. Usando função ehPrimo:');
const numeros = [2, 7, 10, 13, 20, 29];
console.log('   Verificando números primos:');
numeros.forEach(num => {
  console.log(`   ${num} é primo? ${utilitarios.ehPrimo(num)}`);
});
console.log();

// 5. Acessar informações do módulo
console.log('5. Informações do módulo:');
console.log(`   Nome: ${utilitarios.info.nome}`);
console.log(`   Versão: ${utilitarios.info.versao}`);
console.log(`   Autor: ${utilitarios.info.autor}\n`);

// 6. Usar destructuring para importar apenas algumas funções
console.log('6. Usando destructuring (importação seletiva):');
const { saudar, somar, fatorial } = require('./05-modulo-utilitarios');
console.log(`   ${saudar('Pedro')}`);
console.log(`   Resultado: ${somar(7, 8)}`);
console.log(`   Fatorial de 4: ${fatorial(4)}\n`);

console.log('✓ Módulo importado e utilizado com sucesso!');
