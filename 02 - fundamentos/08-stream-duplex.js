/**
 * Questão 8: Implementar um stream Duplex para modificar dados durante a leitura e escrita
 * 
 * Para executar:
 * node 08-stream-duplex.js
 */

const { Duplex, Transform } = require('stream');
const fs = require('fs');
const path = require('path');

console.log('=== Stream Duplex e Transform ===\n');

// 1. Stream Duplex simples
console.log('1. Criando um Stream Duplex simples:');

class DuplexSimples extends Duplex {
  constructor(options) {
    super(options);
    this.contador = 0;
  }

  _read(size) {
    // Lado de leitura: gera dados
    if (this.contador < 5) {
      const numero = this.contador + 1;
      this.push(`Número ${numero}\n`);
      this.contador++;
    } else {
      this.push(null); // Sinal de fim
    }
  }

  _write(chunk, encoding, callback) {
    // Lado de escrita: recebe dados
    console.log(`   Escrita recebida: ${chunk.toString().trim()}`);
    callback();
  }
}

const duplexSimples = new DuplexSimples();
duplexSimples.on('data', (dados) => {
  console.log(`   Dados lidos: ${dados.toString().trim()}`);
});

duplexSimples.on('end', () => {
  console.log('   ✓ Duplex simples finalizado\n');
});

duplexSimples.write('Teste 1');
duplexSimples.write('Teste 2');

// 2. Stream Transform para converter texto para maiúsculas
setTimeout(() => {
  console.log('2. Stream Transform para converter para MAIÚSCULAS:');

  class TransformMaiuscula extends Transform {
    _transform(chunk, encoding, callback) {
      // Transformar dados
      const dados = chunk.toString().toUpperCase();
      this.push(dados);
      callback();
    }
  }

  const transformar = new TransformMaiuscula();
  transformar.on('data', (dados) => {
    console.log(`   Transformado: ${dados.toString()}`);
  });

  transformar.write('hello world\n');
  transformar.write('node.js streams\n');
  transformar.end();
}, 500);

// 3. Stream Transform para adicionar números de linha
setTimeout(() => {
  console.log('\n3. Stream Transform para adicionar números de linha:');

  class TransformComNumeroLinha extends Transform {
    constructor(options) {
      super(options);
      this.numeroLinha = 0;
    }

    _transform(chunk, encoding, callback) {
      const linhas = chunk.toString().split('\n');
      const linhasTransformadas = linhas
        .filter(linha => linha.trim() !== '')
        .map(linha => {
          this.numeroLinha++;
          return `${this.numeroLinha}. ${linha}\n`;
        });
      
      this.push(linhasTransformadas.join(''));
      callback();
    }
  }

  const transformar = new TransformComNumeroLinha();
  transformar.on('data', (dados) => {
    process.stdout.write('   ' + dados.toString());
  });

  transformar.write('Primeira linha\n');
  transformar.write('Segunda linha\n');
  transformar.write('Terceira linha\n');
  transformar.end();
}, 1000);

// 4. Stream Duplex com transformação bidirecional
setTimeout(() => {
  console.log('\n4. Stream Duplex com transformação bidirecional:');

  class DuplexBidirecional extends Duplex {
    constructor(options) {
      super(options);
      this.dadosEscrita = [];
      this.contador = 0;
    }

    _read(size) {
      // Lado de leitura: retorna os dados que foram escritos (transformados)
      if (this.contador < this.dadosEscrita.length) {
        const dados = this.dadosEscrita[this.contador];
        const transformado = `[PROCESSADO] ${dados.trim().toUpperCase()}\n`;
        this.push(transformado);
        this.contador++;
      } else if (this.contador === this.dadosEscrita.length && this.contador > 0) {
        this.push(null);
        this.contador++;
      }
    }

    _write(chunk, encoding, callback) {
      // Lado de escrita: armazena e sinaliza para ler
      this.dadosEscrita.push(chunk.toString());
      callback();
    }
  }

  const duplex = new DuplexBidirecional();
  
  duplex.on('data', (dados) => {
    process.stdout.write('   ' + dados.toString());
  });

  duplex.write('entrada 1\n');
  duplex.write('entrada 2\n');
  duplex.write('entrada 3\n');
  duplex.end();
}, 1500);

// 5. Pipeline com múltiplos Transforms
setTimeout(() => {
  console.log('\n5. Pipeline com múltiplos Transforms:');

  class TransformMinuscula extends Transform {
    _transform(chunk, encoding, callback) {
      this.push(chunk.toString().toLowerCase());
      callback();
    }
  }

  class TransformAdicionar extends Transform {
    _transform(chunk, encoding, callback) {
      this.push(`[PROCESSADO] ${chunk.toString()}`);
      callback();
    }
  }

  const t1 = new TransformMaiuscula();
  const t2 = new TransformMinuscula();
  const t3 = new TransformAdicionar();

  console.log('   Input -> Maiúsculas -> Minúsculas -> Adicionar Prefixo -> Output\n');

  t1.pipe(t2).pipe(t3);

  t3.on('data', (dados) => {
    console.log('   ' + dados.toString().trim());
  });

  t1.write('Hello NODE.js');
  t1.write(' Stream TRANSFORM');
  t1.end();
}, 2000);

// 6. Transformar dados de arquivo grande
setTimeout(() => {
  console.log('\n6. Transformar dados de arquivo grande:');

  // Criar arquivo de origem
  const caminhoOrigem = path.join(__dirname, 'dados-origem.txt');
  fs.writeFileSync(caminhoOrigem, 'linha um\nlinha dois\nlinha três\nlinha quatro');

  class TransformParaJSON extends Transform {
    constructor(options) {
      super(options);
      this.linhas = [];
    }

    _transform(chunk, encoding, callback) {
      const texto = chunk.toString();
      this.linhas = texto.split('\n');
      callback();
    }

    _flush(callback) {
      const jsonData = JSON.stringify(
        this.linhas.map((linha, index) => ({
          id: index + 1,
          conteudo: linha.toUpperCase()
        })),
        null,
        2
      );
      this.push(jsonData);
      callback();
    }
  }

  const leitor = fs.createReadStream(caminhoOrigem);
  const transformador = new TransformParaJSON();
  const escritor = fs.createWriteStream(path.join(__dirname, 'dados-transformados.json'));

  leitor.pipe(transformador).pipe(escritor);

  escritor.on('finish', () => {
    console.log('   ✓ Arquivo transformado e salvo em dados-transformados.json');
    const conteudo = fs.readFileSync(path.join(__dirname, 'dados-transformados.json'), 'utf-8');
    console.log('   Conteúdo:');
    conteudo.split('\n').forEach(linha => {
      if (linha.trim()) console.log('   ' + linha);
    });
  });
}, 2500);

// Classe Transform reutilizável
class TransformMaiuscula extends Transform {
  _transform(chunk, encoding, callback) {
    const dados = chunk.toString().toUpperCase();
    this.push(dados);
    callback();
  }
}
