/**
 * Questão 6: Configurar e ler um arquivo JSON usando o módulo fs
 * 
 * Para executar:
 * node 06-json.js
 */

const fs = require('fs');
const path = require('path');

const caminhoJSON = path.join(__dirname, 'dados.json');

console.log('=== Trabalhando com Arquivos JSON ===\n');

// 1. Criar um objeto JavaScript
console.log('1. Criando objeto JavaScript:');
const usuario = {
  id: 1,
  nome: 'João Silva',
  email: 'joao@example.com',
  idade: 28,
  ativo: true,
  skills: ['JavaScript', 'Node.js', 'React'],
  endereco: {
    rua: 'Rua das Flores',
    numero: 123,
    cidade: 'São Paulo',
    estado: 'SP'
  }
};

console.log('   Objeto criado:');
console.log(usuario);
console.log();

// 2. Converter objeto para JSON e salvar em arquivo
console.log('2. Salvando objeto em arquivo JSON:');
const jsonString = JSON.stringify(usuario, null, 2);
fs.writeFileSync(caminhoJSON, jsonString);
console.log(`   ✓ Arquivo salvo em: ${caminhoJSON}\n`);

// 3. Exibir conteúdo do arquivo
console.log('3. Conteúdo do arquivo JSON:');
console.log(jsonString);
console.log();

// 4. Ler arquivo JSON (síncrono)
console.log('4. Lendo arquivo JSON (síncrono):');
const dadosLidos = JSON.parse(fs.readFileSync(caminhoJSON, 'utf-8'));
console.log(`   Nome: ${dadosLidos.nome}`);
console.log(`   Email: ${dadosLidos.email}`);
console.log(`   Cidade: ${dadosLidos.endereco.cidade}\n`);

// 5. Ler arquivo JSON (assíncrono)
console.log('5. Lendo arquivo JSON (assíncrono):');
fs.readFile(caminhoJSON, 'utf-8', (erro, dados) => {
  if (erro) {
    console.error('Erro:', erro);
    return;
  }
  
  const usuario = JSON.parse(dados);
  console.log(`   Usuário: ${usuario.nome}`);
  console.log(`   Skills: ${usuario.skills.join(', ')}\n`);
});

// 6. Ler arquivo JSON (com Promises)
setTimeout(() => {
  console.log('6. Lendo arquivo JSON (com Promises):');
  fs.promises.readFile(caminhoJSON, 'utf-8')
    .then(dados => {
      const usuario = JSON.parse(dados);
      console.log(`   ID: ${usuario.id}`);
      console.log(`   Ativo: ${usuario.ativo ? 'Sim' : 'Não'}\n`);
    })
    .catch(erro => {
      console.error('Erro:', erro);
    });
}, 100);

// 7. Adicionar dados ao JSON existente
setTimeout(() => {
  console.log('7. Adicionando dados ao JSON:');
  const dadosAtuals = JSON.parse(fs.readFileSync(caminhoJSON, 'utf-8'));
  dadosAtuals.telefone = '(11) 98765-4321';
  dadosAtuals.dataCadastro = new Date().toISOString();
  
  fs.writeFileSync(caminhoJSON, JSON.stringify(dadosAtuals, null, 2));
  console.log('   ✓ Dados adicionados\n');
  
  // Exibir dados atualizados
  console.log('8. Dados atualizados:');
  const dadosAtualizados = JSON.parse(fs.readFileSync(caminhoJSON, 'utf-8'));
  console.log(JSON.stringify(dadosAtualizados, null, 2));
}, 200);

// 9. Criar array de usuários em JSON
setTimeout(() => {
  console.log('\n9. Criando array de usuários em JSON:');
  const usuarios = [
    { id: 1, nome: 'João', email: 'joao@example.com' },
    { id: 2, nome: 'Maria', email: 'maria@example.com' },
    { id: 3, nome: 'Pedro', email: 'pedro@example.com' }
  ];
  
  const caminhoUsuarios = path.join(__dirname, 'usuarios.json');
  fs.writeFileSync(caminhoUsuarios, JSON.stringify(usuarios, null, 2));
  console.log(`   ✓ Array de usuários salvo em ${caminhoUsuarios}\n`);
  
  // Ler e exibir
  const usuariosLidos = JSON.parse(fs.readFileSync(caminhoUsuarios, 'utf-8'));
  console.log('10. Lendo array de usuários:');
  usuariosLidos.forEach(user => {
    console.log(`   - ${user.nome} (${user.email})`);
  });
}, 300);
