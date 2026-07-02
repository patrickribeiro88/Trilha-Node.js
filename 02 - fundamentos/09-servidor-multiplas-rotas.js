/**
 * Questão 9: Configurar um servidor HTTP que responda de forma diferente para cada rota
 * 
 * Para executar:
 * node 09-servidor-multiplas-rotas.js
 * 
 * Acesse as rotas:
 * http://localhost:3001/
 * http://localhost:3001/sobre
 * http://localhost:3001/usuarios
 * http://localhost:3001/api/dados
 * http://localhost:3001/api/usuarios/123
 * http://localhost:3001/contato
 * http://localhost:3001/inexistente
 */

const http = require('http');
const url = require('url');
const querystring = require('querystring');

// Dados simulados
const usuarios = [
  { id: 1, nome: 'João Silva', email: 'joao@example.com' },
  { id: 2, nome: 'Maria Santos', email: 'maria@example.com' },
  { id: 3, nome: 'Pedro Oliveira', email: 'pedro@example.com' }
];

const servidor = http.createServer((req, res) => {
  // Parse da URL e query string
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);

  // Definir header padrão
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  // Router - diferentes respostas para diferentes rotas
  if (pathname === '/' || pathname === '') {
    // Página inicial
    respostaHome(res);
  } else if (pathname === '/sobre') {
    // Página sobre
    respostaSobre(res);
  } else if (pathname === '/usuarios') {
    // Lista de usuários (HTML)
    respostaUsuarios(res);
  } else if (pathname === '/api/dados') {
    // API retornando JSON
    respostaAPIJSON(res);
  } else if (pathname.startsWith('/api/usuarios/')) {
    // API com parâmetro dinâmico
    const id = pathname.replace('/api/usuarios/', '');
    respostaAPIUsuario(res, id);
  } else if (pathname === '/contato') {
    // Página de contato
    respostaContato(res, query);
  } else {
    // Página 404 - não encontrada
    respostaNaoEncontrada(res, pathname);
  }
});

// Funções para cada rota
function respostaHome(res) {
  res.writeHead(200);
  res.end(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>Servidor HTTP - Node.js</title>
      <style>
        body { font-family: Arial; margin: 20px; }
        h1 { color: #333; }
        a { margin-right: 15px; }
        .rota { background: #f0f0f0; padding: 8px; margin: 5px 0; }
      </style>
    </head>
    <body>
      <h1>🏠 Bem-vindo ao Servidor HTTP Node.js</h1>
      <p>Navegue pelas rotas disponíveis:</p>
      
      <div class="rota"><a href="/">Home</a> - Página inicial</div>
      <div class="rota"><a href="/sobre">Sobre</a> - Informações do servidor</div>
      <div class="rota"><a href="/usuarios">Usuários</a> - Lista de usuários</div>
      <div class="rota"><a href="/api/dados">API - Dados</a> - Retorna JSON</div>
      <div class="rota"><a href="/api/usuarios/1">API - Usuário 1</a> - Usuário específico</div>
      <div class="rota"><a href="/contato">Contato</a> - Formulário</div>
      
      <hr>
      <p><small>Desenvolvido em Node.js</small></p>
    </body>
    </html>
  `);
}

function respostaSobre(res) {
  res.writeHead(200);
  res.end(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>Sobre</title>
      <style>
        body { font-family: Arial; margin: 20px; }
        a { color: blue; text-decoration: none; }
      </style>
    </head>
    <body>
      <h1>ℹ️ Sobre Este Servidor</h1>
      
      <h2>Informações do Servidor:</h2>
      <ul>
        <li>Plataforma: Node.js</li>
        <li>Módulo: http</li>
        <li>Porta: 3001</li>
        <li>Versão: 1.0.0</li>
      </ul>
      
      <h2>Funcionalidades:</h2>
      <ul>
        <li>✓ Roteamento básico</li>
        <li>✓ Resposta HTML</li>
        <li>✓ API JSON</li>
        <li>✓ Parâmetros dinâmicos</li>
        <li>✓ Query strings</li>
        <li>✓ Erros 404</li>
      </ul>
      
      <hr>
      <a href="/">← Voltar para Home</a>
    </body>
    </html>
  `);
}

function respostaUsuarios(res) {
  res.writeHead(200);
  
  let html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>Usuários</title>
      <style>
        body { font-family: Arial; margin: 20px; }
        table { border-collapse: collapse; width: 100%; max-width: 600px; }
        th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        th { background-color: #4CAF50; color: white; }
        tr:nth-child(even) { background-color: #f2f2f2; }
        a { color: blue; text-decoration: none; }
      </style>
    </head>
    <body>
      <h1>👥 Lista de Usuários</h1>
      
      <table>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>
        </tr>
  `;

  usuarios.forEach(usuario => {
    html += `
        <tr>
          <td>${usuario.id}</td>
          <td>${usuario.nome}</td>
          <td>${usuario.email}</td>
        </tr>
    `;
  });

  html += `
      </table>
      
      <hr>
      <a href="/">← Voltar para Home</a>
    </body>
    </html>
  `;

  res.end(html);
}

function respostaAPIJSON(res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.writeHead(200);
  
  const resposta = {
    status: 'sucesso',
    timestamp: new Date().toISOString(),
    dados: {
      versao: '1.0.0',
      servidor: 'Node.js HTTP',
      porta: 3001,
      rotas: [
        '/',
        '/sobre',
        '/usuarios',
        '/api/dados',
        '/api/usuarios/:id',
        '/contato'
      ]
    }
  };
  
  res.end(JSON.stringify(resposta, null, 2));
}

function respostaAPIUsuario(res, id) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  
  // Validar ID
  if (isNaN(id) || id < 1 || id > usuarios.length) {
    res.writeHead(404);
    res.end(JSON.stringify({
      status: 'erro',
      mensagem: `Usuário com ID ${id} não encontrado`,
      codigo: 404
    }, null, 2));
    return;
  }

  const usuario = usuarios[id - 1];
  
  res.writeHead(200);
  res.end(JSON.stringify({
    status: 'sucesso',
    dados: usuario
  }, null, 2));
}

function respostaContato(res, query) {
  res.writeHead(200);
  
  let html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>Contato</title>
      <style>
        body { font-family: Arial; margin: 20px; }
        form { max-width: 400px; }
        input, textarea { width: 100%; padding: 8px; margin: 5px 0 15px 0; box-sizing: border-box; }
        button { background-color: #4CAF50; color: white; padding: 10px 20px; cursor: pointer; }
        button:hover { background-color: #45a049; }
        .sucesso { color: green; margin-top: 20px; }
        a { color: blue; text-decoration: none; display: block; margin-top: 20px; }
      </style>
    </head>
    <body>
      <h1>📧 Entre em Contato</h1>
  `;

  // Se houver query parameters, mostrar mensagem de sucesso
  if (query.nome && query.email && query.mensagem) {
    html += `
      <div class="sucesso">
        <h2>✓ Mensagem recebida com sucesso!</h2>
        <p><strong>Nome:</strong> ${query.nome}</p>
        <p><strong>Email:</strong> ${query.email}</p>
        <p><strong>Mensagem:</strong> ${query.mensagem}</p>
      </div>
    `;
  } else {
    html += `
      <form method="GET">
        <input type="text" name="nome" placeholder="Seu nome" required>
        <input type="email" name="email" placeholder="Seu email" required>
        <textarea name="mensagem" placeholder="Sua mensagem" rows="5" required></textarea>
        <button type="submit">Enviar Mensagem</button>
      </form>
    `;
  }

  html += `
      <a href="/">← Voltar para Home</a>
    </body>
    </html>
  `;

  res.end(html);
}

function respostaNaoEncontrada(res, pathname) {
  res.writeHead(404);
  res.end(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>Erro 404</title>
      <style>
        body { font-family: Arial; margin: 20px; text-align: center; }
        h1 { color: red; }
        a { color: blue; text-decoration: none; }
      </style>
    </head>
    <body>
      <h1>❌ Erro 404 - Página Não Encontrada</h1>
      <p>A rota <strong>${pathname}</strong> não existe neste servidor.</p>
      
      <h3>Rotas disponíveis:</h3>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/sobre">Sobre</a></li>
        <li><a href="/usuarios">Usuários</a></li>
        <li><a href="/api/dados">API - Dados</a></li>
        <li><a href="/contato">Contato</a></li>
      </ul>
      
      <hr>
      <a href="/">← Voltar para Home</a>
    </body>
    </html>
  `);
}

// Iniciar servidor
const PORT = 3001;
servidor.listen(PORT, () => {
  console.log(`\n🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`\nRotas disponíveis:`);
  console.log(`  GET  /                    - Home`);
  console.log(`  GET  /sobre               - Sobre`);
  console.log(`  GET  /usuarios            - Lista de usuários`);
  console.log(`  GET  /api/dados           - Dados em JSON`);
  console.log(`  GET  /api/usuarios/:id    - Usuário específico`);
  console.log(`  GET  /contato             - Página de contato`);
  console.log(`\n⏹️  Pressione Ctrl+C para parar o servidor\n`);
});
