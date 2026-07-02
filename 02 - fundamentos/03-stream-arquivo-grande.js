/**
 * Questão 3: Stream para processar dados de um arquivo grande
 * 
 * Para executar:
 * node 03-stream-arquivo-grande.js
 * 
 * Cria um arquivo grande e o processa usando streams
 */

const fs = require('fs');
const path = require('path');

const caminhoArquivoGrande = path.join(__dirname, 'arquivo-grande.txt');
const caminhoArquivoProcessado = path.join(__dirname, 'arquivo-processado.txt');

console.log('=== Processando Arquivo Grande com Streams ===\n');

// 1. Criar um arquivo grande (simulação)
console.log('1. Criando arquivo grande...');
const escritor = fs.createWriteStream(caminhoArquivoGrande);

// Escrever 1000 linhas
for (let i = 1; i <= 1000; i++) {
  escritor.write(`Linha ${i}: Este é um exemplo de dados em stream.\n`);
}

escritor.end(() => {
  console.log('   ✓ Arquivo grande criado\n');
  processarComStream();
});

function processarComStream() {
  // 2. Ler o arquivo grande em chunks (pedaços)
  console.log('2. Processando arquivo com stream de leitura...');
  
  const leitor = fs.createReadStream(caminhoArquivoGrande, {
    encoding: 'utf-8',
    highWaterMark: 16 * 1024 // 16 KB por chunk
  });

  let linhasProcessadas = 0;
  let bytesLidos = 0;

  // Evento: quando dados estão disponíveis
  leitor.on('data', (chunk) => {
    linhasProcessadas += chunk.split('\n').length - 1;
    bytesLidos += chunk.length;
    
    // Mostrar progresso a cada 300 KB
    if (bytesLidos % (300 * 1024) === 0) {
      console.log(`   Processados: ${(bytesLidos / 1024).toFixed(2)} KB`);
    }
  });

  // Evento: quando o arquivo foi completamente lido
  leitor.on('end', () => {
    console.log(`   ✓ Arquivo completamente lido`);
    console.log(`   Total de bytes: ${bytesLidos}`);
    console.log(`   Total de linhas: ${linhasProcessadas}\n`);
    
    // 3. Ler e transformar dados usando pipe
    console.log('3. Transformando dados com pipe...');
    
    const leitor2 = fs.createReadStream(caminhoArquivoGrande);
    const escritor2 = fs.createWriteStream(caminhoArquivoProcessado);
    
    // Pipe automaticamente conecta entrada e saída
    leitor2.pipe(escritor2);

    escritor2.on('finish', () => {
      console.log(`   ✓ Dados transformados e salvos em ${caminhoArquivoProcessado}\n`);
      exibirPrimeirasLinhas();
    });

    escritor2.on('error', (erro) => {
      console.error('   Erro ao escrever:', erro);
    });
  });

  // Evento: quando ocorre erro
  leitor.on('error', (erro) => {
    console.error('Erro ao ler arquivo:', erro);
  });
}

function exibirPrimeirasLinhas() {
  console.log('4. Primeiras 5 linhas do arquivo processado:');
  
  const leitor = fs.createReadStream(caminhoArquivoProcessado, {
    encoding: 'utf-8'
  });

  let linhas = [];
  let contador = 0;

  leitor.on('data', (chunk) => {
    linhas = chunk.split('\n');
    contador = 0;
    
    for (let linha of linhas) {
      if (contador >= 5) break;
      if (linha.trim()) {
        console.log(`   ${linha}`);
        contador++;
      }
    }
    
    if (contador >= 5) {
      leitor.destroy(); // Parar de ler
    }
  });

  leitor.on('close', () => {
    console.log('\n✓ Processamento concluído!');
  });
}
