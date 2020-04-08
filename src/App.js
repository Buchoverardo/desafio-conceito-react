import React, { useEffect, useState } from "react";

import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect( () => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Repositorio - ${Date.now()}`,
      url: "url",
      techs: [],
      likes: 0
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);

  }

  async function handleRemoveRepository(id) {
    const url = `repositories/${id}`;
    await api.delete(url);

    const deleteRepo = repositories.filter(repository => repository.id !== id);
    setRepositories(deleteRepo);
  }

  return (
    <div className="container">
      <ul data-testid="repository-list">
        {repositories.map(repo =>
            <li key={repo.id} className="novoLi">
            {repo.title}
  
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
          )}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
