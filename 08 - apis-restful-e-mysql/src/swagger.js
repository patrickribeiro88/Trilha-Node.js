const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Users Example',
      version: '1.0.0',
      description: 'API exemplo com CRUD, paginação, filtro e validação'
    }
  },
  apis: []
};

const swaggerSpec = swaggerJSDoc(options);

// Manually add paths for our endpoints
swaggerSpec.paths = {
  '/users': {
    get: {
      summary: 'List users',
      parameters: [
        { name: 'page', in: 'query', schema: { type: 'integer' } },
        { name: 'limit', in: 'query', schema: { type: 'integer' } },
        { name: 'name', in: 'query', schema: { type: 'string' } }
      ],
      responses: { '200': { description: 'Lista de usuários' } }
    },
    post: {
      summary: 'Create user',
      requestBody: { content: { 'application/json': { schema: { type: 'object' } } } },
      responses: { '201': { description: 'Usuário criado' }, '400': { description: 'Dados inválidos' } }
    }
  },
  '/users/{id}': {
    put: {
      summary: 'Update user by id',
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
      requestBody: { content: { 'application/json': { schema: { type: 'object' } } } },
      responses: { '200': { description: 'Usuário atualizado' }, '404': { description: 'Não encontrado' } }
    },
    delete: {
      summary: 'Delete user by id',
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
      responses: { '204': { description: 'Deletado' }, '404': { description: 'Não encontrado' } }
    }
  }
};

module.exports = swaggerSpec;
