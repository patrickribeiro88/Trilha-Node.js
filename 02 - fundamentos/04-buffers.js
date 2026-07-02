/**
 * Questão 4: Utilizar Buffers para manipular uma string e convertê-la em dados binários
 * 
 * Para executar:
 * node 04-buffers.js
 */

console.log('=== Manipulação de Buffers ===\n');

// 1. Criar um buffer a partir de uma string
console.log('1. Criando buffer de uma string:');
const texto = 'Bem-vindo ao Node.js!';
const buffer1 = Buffer.from(texto, 'utf-8');
console.log(`   String original: "${texto}"`);
console.log(`   Buffer: ${buffer1}`);
console.log(`   Buffer em hex: ${buffer1.toString('hex')}`);
console.log(`   Tamanho: ${buffer1.length} bytes\n`);

// 2. Converter buffer de volta para string
console.log('2. Convertendo buffer de volta para string:');
const stringRecuperada = buffer1.toString('utf-8');
console.log(`   String recuperada: "${stringRecuperada}"\n`);

// 3. Criar buffer com tamanho alocado
console.log('3. Criando buffer com tamanho alocado:');
const buffer2 = Buffer.alloc(10);
buffer2.write('Node.js');
console.log(`   Buffer: ${buffer2}`);
console.log(`   Conteúdo: "${buffer2.toString()}"`);
console.log(`   Tamanho: ${buffer2.length} bytes\n`);

// 4. Criar buffer não inicializado (mais rápido)
console.log('4. Criando buffer não inicializado:');
const buffer3 = Buffer.allocUnsafe(5);
buffer3.write('12345');
console.log(`   Buffer: ${buffer3}\n`);

// 5. Concatenar buffers
console.log('5. Concatenando buffers:');
const buffer4 = Buffer.from('Hello ');
const buffer5 = Buffer.from('World');
const bufferConcatenado = Buffer.concat([buffer4, buffer5]);
console.log(`   Resultado: ${bufferConcatenado.toString()}\n`);

// 6. Comparar buffers
console.log('6. Comparando buffers:');
const buffer6 = Buffer.from('Node');
const buffer7 = Buffer.from('Node');
const buffer8 = Buffer.from('Python');
console.log(`   Buffer.from('Node').equals(Buffer.from('Node')): ${buffer6.equals(buffer7)}`);
console.log(`   Buffer.from('Node').equals(Buffer.from('Python')): ${buffer6.equals(buffer8)}\n`);

// 7. Copiar dados entre buffers
console.log('7. Copiando dados entre buffers:');
const buffer9 = Buffer.from('Hello World');
const buffer10 = Buffer.alloc(5);
buffer9.copy(buffer10, 0, 0, 5);
console.log(`   Original: ${buffer9}`);
console.log(`   Cópia: ${buffer10}\n`);

// 8. Obter informações sobre um buffer
console.log('8. Informações do buffer:');
const buffer11 = Buffer.from('Node.js Streams');
console.log(`   Buffer: ${buffer11}`);
console.log(`   Tamanho: ${buffer11.length} bytes`);
console.log(`   Conteúdo (hex): ${buffer11.toString('hex')}`);
console.log(`   Conteúdo (base64): ${buffer11.toString('base64')}`);
console.log(`   Conteúdo (ascii): ${buffer11.toString('ascii')}\n`);

// 9. Manipulação de bits individuais
console.log('9. Acessando bytes individuais:');
const buffer12 = Buffer.from('Node');
console.log(`   Buffer: ${buffer12}`);
for (let i = 0; i < buffer12.length; i++) {
  console.log(`   Byte ${i}: ${buffer12[i]} (char: '${String.fromCharCode(buffer12[i])}')`);
}
console.log();

// 10. Converter dados binários para Base64
console.log('10. Convertendo para diferentes codificações:');
const dados = 'Node.js é incrível!';
const bufferUtf8 = Buffer.from(dados, 'utf-8');
console.log(`   Original: "${dados}"`);
console.log(`   UTF-8: ${bufferUtf8.toString('utf-8')}`);
console.log(`   Hex: ${bufferUtf8.toString('hex')}`);
console.log(`   Base64: ${bufferUtf8.toString('base64')}`);
console.log(`   ASCII: ${bufferUtf8.toString('ascii')}`);
