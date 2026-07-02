/**
 * Questão 10: Debug um erro em um script usando --inspect
 * 
 * Para executar com debug:
 * node --inspect 10-debug-inspect.js
 * 
 * Depois acesse em seu navegador:
 * chrome://inspect
 * ou
 * http://localhost:9229
 * 
 * Outras opções de debug:
 * node --inspect-brk 10-debug-inspect.js  (pausa na primeira linha)
 * node --inspect --inspect-port=9230 10-debug-inspect.js  (porta customizada)
 */

// Simulação de erros que podem ser debugados

console.log('=== Script de Debug com --inspect ===\n');

// 1. Array de dados para processar
const dados = [
  { id: 1, nome: 'João', idade: 28 },
  { id: 2, nome: 'Maria', idade: null }, // Erro propositalmente: idade nula
  { id: 3, nome: 'Pedro', idade: 35 }
];

console.log('1. Processando dados...');

// 2. Função com lógica para debugar
function processarUsuarios(usuarios) {
  const resultado = [];

  for (let i = 0; i < usuarios.length; i++) {
    const usuario = usuarios[i];
    
    // Breakpoint aqui: coloque o cursor nesta linha e pause
    console.log(`  Processando usuário: ${usuario.nome}`);
    
    try {
      // Aqui há um erro potencial se idade for null
      const ano = new Date().getFullYear() - usuario.idade;
      
      const usuarioProcessado = {
        id: usuario.id,
        nome: usuario.nome.toUpperCase(),
        idade: usuario.idade,
        anoNascimento: ano,
        ativo: true
      };
      
      resultado.push(usuarioProcessado);
    } catch (erro) {
      console.error(`  ✗ Erro ao processar ${usuario.nome}: ${erro.message}`);
    }
  }

  return resultado;
}

const usuariosProcessados = processarUsuarios(dados);

console.log('\n2. Resultado do processamento:');
console.log(usuariosProcessados);

// 3. Função recursiva (útil para debugar stack traces)
console.log('\n3. Função recursiva - Fibonacci:');

function fibonacci(n, debug = false) {
  if (debug) console.log(`  fibonacci(${n})`);
  
  if (n <= 1) return n;
  return fibonacci(n - 1, debug) + fibonacci(n - 2, debug);
}

const resultado = fibonacci(10, false); // Mude para true para ver detalhes
console.log(`  Fibonacci(10) = ${resultado}`);

// 4. Função com múltiplas chamadas de função (stack trace)
console.log('\n4. Stack trace com múltiplas chamadas:');

function funcaoA() {
  console.log('  Dentro de funcaoA');
  funcaoB();
}

function funcaoB() {
  console.log('  Dentro de funcaoB');
  funcaoC();
}

function funcaoC() {
  console.log('  Dentro de funcaoC');
  console.log('  Stack trace será visível no debugger');
  // Aqui você pode adicionar: debugger; para pausar automaticamente
}

funcaoA();

// 5. Manipulação de objeto com propriedades
console.log('\n5. Objeto complexo para debugar:');

const pessoa = {
  nome: 'Ana',
  endereco: {
    rua: 'Rua das Flores',
    numero: 123,
    cidade: 'São Paulo'
  },
  hobbies: ['leitura', 'programação', 'viagens'],
  dados: {
    dataNascimento: '1990-05-15',
    profissao: 'Desenvolvedora'
  }
};

console.log('  Acessando propriedades aninhadas:');
console.log(`  Nome: ${pessoa.nome}`);
console.log(`  Cidade: ${pessoa.endereco.cidade}`);
console.log(`  Primeiro hobby: ${pessoa.hobbies[0]}`);
console.log(`  Profissão: ${pessoa.dados.profissao}`);

// 6. Debugar assincronia
console.log('\n6. Operações assíncronas:');

async function operacaoAssincrona() {
  console.log('  Iniciando operação assíncrona');
  
  // Simular delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log('  Operação assíncrona concluída');
  return 'Resultado da operação assíncrona';
}

operacaoAssincrona().then(resultado => {
  console.log(`  ${resultado}\n`);
});

// 7. Código com possível erro de tipo
console.log('7. Verificação de tipos:');

function dividir(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Ambos os argumentos devem ser números');
  }
  if (b === 0) {
    throw new Error('Divisor não pode ser zero');
  }
  return a / b;
}

try {
  console.log(`  10 / 2 = ${dividir(10, 2)}`);
  console.log(`  15 / 3 = ${dividir(15, 3)}`);
  // console.log(`  20 / 0 = ${dividir(20, 0)}`); // Descomente para gerar erro
} catch (erro) {
  console.error(`  ✗ Erro: ${erro.message}`);
}

// 8. Closure para debugar escopos
console.log('\n8. Closures e escopos:');

function criarContador() {
  let contador = 0; // Esta variável é fechada (closure)
  
  return {
    incrementar: function() {
      contador++;
      return contador;
    },
    decrementar: function() {
      contador--;
      return contador;
    },
    obter: function() {
      return contador;
    }
  };
}

const meuContador = criarContador();
console.log(`  Inicial: ${meuContador.obter()}`);
console.log(`  Após incrementar: ${meuContador.incrementar()}`);
console.log(`  Após incrementar: ${meuContador.incrementar()}`);
console.log(`  Após decrementar: ${meuContador.decrementar()}`);
console.log(`  Final: ${meuContador.obter()}`);

// 9. Map e Array complexo
console.log('\n9. Operações com Array e Map:');

const numeros = [1, 2, 3, 4, 5];
const resultado1 = numeros
  .filter(n => n % 2 === 0)
  .map(n => n * 2);

console.log(`  Números: ${numeros}`);
console.log(`  Pares * 2: ${resultado1}`);

// 10. Mostrar informações de debug
console.log('\n10. Informações de Debug:');
console.log(`  Versão do Node.js: ${process.version}`);
console.log(`  Plataforma: ${process.platform}`);
console.log(`  PID do processo: ${process.pid}`);
console.log(`  Diretório atual: ${process.cwd()}`);
console.log(`  Variáveis de ambiente (NODE_ENV): ${process.env.NODE_ENV || 'não definida'}`);

// 11. Listener para exceções não capturadas
process.on('uncaughtException', (erro) => {
  console.error('\n⚠️  Exceção não capturada:', erro.message);
  console.error('Stack trace:', erro.stack);
});

// 12. Listener para promessas rejeitadas
process.on('unhandledRejection', (razao) => {
  console.error('\n⚠️  Promise rejeitada não tratada:', razao);
});

console.log('\n' + '='.repeat(50));
console.log('✓ Script de debug finalizado');
console.log('='.repeat(50));

console.log(`
INSTRUÇÕES PARA DEBUGAR:
1. Execute: node --inspect 10-debug-inspect.js
2. Abra: chrome://inspect
3. Clique em "inspect" no script
4. Use o DevTools para:
   - Adicionar breakpoints (clique na linha)
   - Ver variáveis locais
   - Executar passo a passo (Step over/into)
   - Ver o call stack
   - Executar expressões no console

DICAS DE DEBUG:
- Use debugger; no código para pausar automaticamente
- Verifique o painel "Sources" para ver o código
- Use o painel "Console" para executar expressões
- Monitore variáveis usando "Watch expressions"
- Veja o "Call stack" para rastrear chamadas de função
`);
