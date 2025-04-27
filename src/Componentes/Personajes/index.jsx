// Personajes.js
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './style.css';

function Personajes() {
  const { name } = useParams();
  const [personajes, setPersonajes] = useState([]);
  const [favoritos, setFavoritos] = useState(() => {
    const storedFavorites = localStorage.getItem('favoritos');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  const navigate = useNavigate();

  const esFavorito = (nombre) => favoritos.some(p => p.name === nombre);

  useEffect(() => {
    const obtenerPersonajes = async () => {
      try {
        const res = await fetch(`https://api.disneyapi.dev/character?films=${encodeURIComponent('The Little Mermaid')}`);
        const resultado = await res.json();
        
        if (resultado.data?.length > 0) {
          // Almacenar tanto nombres como imágenes
          const personajesConImagenes = resultado.data.map(personaje => ({
            name: personaje.name,
            image: personaje.imageUrl // Asegúrate de que este campo es correcto
          }));
          setPersonajes(personajesConImagenes);
        } else {
          setPersonajes([]);
        }
      } catch (error) {
        console.error("Error al cargar personajes:", error);
      }
    };

    obtenerPersonajes();
  }, []);

  const toggleFavorito = (nombre, imagen) => {
    let nuevosFavoritos;
    if (favoritos.some(p => p.name === nombre)) {
      nuevosFavoritos = favoritos.filter(p => p.name !== nombre);
    } else {
      nuevosFavoritos = [...favoritos, { name: nombre, image: imagen }];
    }
    setFavoritos(nuevosFavoritos);
    localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
    navigate('/favoritos'); // Navegar a la página de Favoritos
  };

  return (
    <div className="personajes-lista">
      <h2>Personajes de La Sirenita</h2>
      {personajes.length === 0 ? (
        <p>No se encontraron personajes.</p>
      ) : (
        <ul>
          {personajes.map((personaje, index) => (
            <li key={index}>
              <img src={personaje.image} alt={personaje.name} style={{ width: '100px', height: 'auto' }} />
              {personaje.name}
              <button className={`favorito-btn ${esFavorito(personaje.name) ? 'favorito' : ''}`} onClick={() => toggleFavorito(personaje.name, personaje.image)}>
                {esFavorito(personaje.name) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Personajes;
