async function fetchData(url = 'https://jsonplaceholder.typicode.com/todos/1') {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Erro ao buscar dados: ${response.status}`);
  }

  return response.json();
}

module.exports = { fetchData };
