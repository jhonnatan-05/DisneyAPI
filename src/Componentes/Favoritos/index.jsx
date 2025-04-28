import { useState, useEffect } from 'react';
import './style.css';

function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoritos');
    if (storedFavorites) {
      setFavoritos(JSON.parse(storedFavorites));
    }
  }, []);

  const quitarFavorito = (nombre) => {
    const nuevosFavoritos = favoritos.filter(personaje => personaje.name !== nombre);
    setFavoritos(nuevosFavoritos);
    localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
  };

  return (
    <div className="favoritos-lista">
      <h1>Favoritos</h1>
      {favoritos.length === 0 ? (
        <p>No hay personajes favoritos.</p>
      ) : (
        <ul>
          {favoritos.map((personaje, index) => (
            <li key={index}>
              <img src={personaje.image} alt={personaje.name} style={{ width: '100px', height: 'auto' }} />
              <span>{personaje.name}</span>
              <button onClick={() => quitarFavorito(personaje.name)}>Quitar de favoritos</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favoritos;
