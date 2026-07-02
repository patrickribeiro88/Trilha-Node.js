# Introdução ao Node.js

Este repositório contém um projeto de exercícios práticos para aprender os fundamentos do Node.js.

## O que este projeto demonstra

- Uso do módulo `fs` para leitura de arquivos (`text.txt` e `user.json`)
- Requisições HTTP com `axios`
- Saída de texto colorido no terminal com `chalk`
- Funções assíncronas e callbacks
- Operações básicas de console e formatação de data

## Arquivos principais

- `index.js` - arquivo principal do projeto
- `package.json` - gerencia dependências e scripts
- `text.txt` - arquivo de texto lido pelo script
- `user.json` - arquivo JSON lido pelo script

## Dependências

- `axios` - cliente HTTP para chamadas de API
- `chalk` - coloração de saída no terminal
- `nodemon` (desenvolvimento) - reinicia o servidor automaticamente durante alterações

## Como usar

1. Instale as dependências:

```bash
npm install
```

2. Execute o projeto:

```bash
npm start
```

3. Para desenvolvimento com reinício automático:

```bash
npm run dev
```

## Observações

- O script `index.js` faz uma requisição para `https://jsonplaceholder.typicode.com/todos/1`.
- O arquivo `user.json` deve conter JSON válido para ser lido corretamente.

## Licença

Projeto com licença MIT.
