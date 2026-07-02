const db = require('./db');
const usuarios = require('./usuarios');

async function main() {
  try {
    await db.testConnection();

    console.log('\n=== CRIANDO USUÁRIO ===');
    const newUserId = await usuarios.createUser(
      'Maria Silva',
      'maria.silva@example.com',
      'senha123'
    );
    console.log('Usuário criado com ID:', newUserId);

    console.log('\n=== LISTANDO USUÁRIOS ===');
    const users = await usuarios.getUsers();
    console.table(users);

    console.log('\n=== ATUALIZANDO USUÁRIO ===');
    const affectedRows = await usuarios.updateUser(
      newUserId,
      'Maria Souza',
      'maria.souza@example.com',
      'novaSenha456'
    );
    console.log('Linhas alteradas:', affectedRows);

    console.log('\n=== BUSCANDO USUÁRIO POR ID ===');
    const user = await usuarios.getUserById(newUserId);
    console.log(user);

    console.log('\n=== EXCLUINDO USUÁRIO ===');
    const deletedRows = await usuarios.deleteUser(newUserId);
    console.log('Linhas excluídas:', deletedRows);
  } catch (error) {
    console.error('Erro no fluxo principal:', error.message);
  } finally {
    await db.pool.end();
  }
}

main();
