/**
 * Questão 2: Criar e ler um arquivo usando o módulo fs
 * 
 * Para executar:
 * node 02-criar-ler-arquivo.js
 */

const fs = require('fs');
const path = require('path');

// Caminho do arquivo a ser criado
const caminhoArquivo = path.join(__dirname, 'dados.txt');

console.log('=== Criando e Lendo Arquivo ===\n');

// 1. Criar um arquivo com conteúdo
console.log('1. Criando arquivo...');
fs.writeFileSync(caminhoArquivo, 'Este é um arquivo de teste criado com Node.js!');
console.log(`   ✓ Arquivo criado em: ${caminhoArquivo}\n`);

// 2. Ler o arquivo (síncrono)
console.log('2. Lendo arquivo (método síncrono)...');
const conteudoSincrono = fs.readFileSync(caminhoArquivo, 'utf-8');
console.log(`   Conteúdo: ${conteudoSincrono}\n`);

// 3. Ler o arquivo (assíncrono com callback)
console.log('3. Lendo arquivo (método assíncrono com callback)...');
fs.readFile(caminhoArquivo, 'utf-8', (erro, dados) => {
  if (erro) {
    console.error('Erro ao ler arquivo:', erro);
    return;
  }
  console.log(`   Conteúdo: ${dados}\n`);
});

// 4. Ler o arquivo (assíncrono com Promises)
console.log('4. Lendo arquivo (método assíncrono com Promises)...');
fs.promises.readFile(caminhoArquivo, 'utf-8')
  .then(dados => {
    console.log(`   Conteúdo: ${dados}\n`);
  })
  .catch(erro => {
    console.error('Erro ao ler arquivo:', erro);
  });

// 5. Adicionar conteúdo ao arquivo (append)
console.log('5. Adicionando conteúdo ao arquivo...');
fs.appendFileSync(caminhoArquivo, '\nEste texto foi adicionado depois!');
console.log('   ✓ Conteúdo adicionado\n');

// 6. Ler o arquivo completo novamente
console.log('6. Lendo arquivo completo após append...');
const conteudoFinal = fs.readFileSync(caminhoArquivo, 'utf-8');
console.log(`   Conteúdo final:\n   ${conteudoFinal.replace(/\n/g, '\n   ')}\n`);

// 7. Obter informações do arquivo
console.log('7. Obtendo informações do arquivo...');
const stats = fs.statSync(caminhoArquivo);
console.log(`   Tamanho: ${stats.size} bytes`);
console.log(`   Criado em: ${stats.birthtime}`);
console.log(`   Modificado em: ${stats.mtime}\n`);
