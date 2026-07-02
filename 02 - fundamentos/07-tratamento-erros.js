/**
 * Questão 7: Script que utiliza try/catch para tratar erros ao acessar um arquivo inexistente
 * 
 * Para executar:
 * node 07-tratamento-erros.js
 */

const fs = require('fs');
const path = require('path');

console.log('=== Tratamento de Erros com Try/Catch ===\n');

// 1. Tratamento de erro com try/catch (síncrono)
console.log('1. Tentando ler arquivo inexistente (síncrono):');
try {
  const dados = fs.readFileSync(path.join(__dirname, 'arquivo-inexistente.txt'), 'utf-8');
  console.log('   Conteúdo:', dados);
} catch (erro) {
  console.error('   ✗ Erro capturado:', erro.message);
  console.log(`   Tipo do erro: ${erro.code}`);
  console.log(`   Caminho: ${erro.path}\n`);
}

// 2. Tratamento de erro ao criar arquivo em diretório inexistente
console.log('2. Tentando criar arquivo em diretório inexistente:');
try {
  const caminhoInvalido = path.join(__dirname, 'pasta-inexistente', 'arquivo.txt');
  fs.writeFileSync(caminhoInvalido, 'Teste');
  console.log('   Arquivo criado com sucesso');
} catch (erro) {
  console.error('   ✗ Erro capturado:', erro.message);
  console.log(`   Código do erro: ${erro.code}\n`);
}

// 3. Tratamento com múltiplas tentativas e fallback
console.log('3. Tentativas múltiplas com fallback:');
let conteudo = null;
const caminhos = [
  path.join(__dirname, 'arquivo-principal.txt'),
  path.join(__dirname, 'arquivo-backup.txt'),
  path.join(__dirname, 'dados.txt')
];

for (let caminho of caminhos) {
  try {
    conteudo = fs.readFileSync(caminho, 'utf-8');
    console.log(`   ✓ Arquivo encontrado: ${path.basename(caminho)}`);
    console.log(`   Conteúdo: ${conteudo.substring(0, 50)}...`);
    break;
  } catch (erro) {
    console.log(`   Arquivo não encontrado: ${path.basename(caminho)}`);
  }
}

if (!conteudo) {
  console.log('   Usando conteúdo padrão (fallback)\n');
} else {
  console.log();
}

// 4. Tratamento de erro ao fazer parse de JSON inválido
console.log('4. Tratamento de JSON inválido:');
try {
  const jsonInvalido = '{ "nome": "João", "idade": 28, }'; // Vírgula extra
  const parsed = JSON.parse(jsonInvalido);
  console.log('   JSON parseado:', parsed);
} catch (erro) {
  console.error('   ✗ Erro ao fazer parse:', erro.message);
  console.log(`   Tipo do erro: ${erro.name}\n`);
}

// 5. Função com tratamento de erro
console.log('5. Função com tratamento de erro:');
function lerArquivoSeguro(caminho, descricao = 'arquivo') {
  try {
    const conteudo = fs.readFileSync(caminho, 'utf-8');
    console.log(`   ✓ ${descricao} lido com sucesso`);
    return { sucesso: true, conteudo };
  } catch (erro) {
    console.error(`   ✗ Erro ao ler ${descricao}: ${erro.message}`);
    return { sucesso: false, conteudo: null, erro };
  }
}

const resultado1 = lerArquivoSeguro(path.join(__dirname, 'dados.txt'), 'Arquivo de dados');
const resultado2 = lerArquivoSeguro(path.join(__dirname, 'nao-existe.txt'), 'Arquivo inexistente');
console.log();

// 6. Tratamento assíncrono com try/catch e async/await
console.log('6. Tratamento assíncrono com try/catch:');
async function lerArquivoAssincrono() {
  try {
    const dados = await fs.promises.readFile(
      path.join(__dirname, 'arquivo-inexistente.txt'),
      'utf-8'
    );
    console.log('   Conteúdo:', dados);
  } catch (erro) {
    console.error('   ✗ Erro ao ler arquivo:', erro.message);
    console.log('   Código do erro:', erro.code);
  }
}

lerArquivoAssincrono();

// 7. Validação de dados antes de usar
setTimeout(() => {
  console.log('\n7. Validação de dados:');
  
  function processarDados(dados) {
    try {
      if (!dados) {
        throw new Error('Dados não podem ser vazios');
      }
      if (typeof dados !== 'object') {
        throw new Error('Dados devem ser um objeto');
      }
      if (!dados.nome) {
        throw new Error('Campo "nome" é obrigatório');
      }
      
      console.log(`   ✓ Dados válidos: ${dados.nome}`);
      return true;
    } catch (erro) {
      console.error(`   ✗ Erro de validação: ${erro.message}`);
      return false;
    }
  }
  
  processarDados({ nome: 'João', idade: 28 });
  processarDados({ idade: 28 }); // Falta "nome"
  processarDados(null); // Dados vazios
}, 500);

// 8. Finally - executar sempre
setTimeout(() => {
  console.log('\n8. Usando finally:');
  
  function operacaoComFinalização() {
    try {
      throw new Error('Erro simulado');
    } catch (erro) {
      console.error('   ✗ Erro capturado:', erro.message);
    } finally {
      console.log('   ℹ Bloco finally sempre é executado (limpeza de recursos)');
    }
  }
  
  operacaoComFinalização();
}, 600);
