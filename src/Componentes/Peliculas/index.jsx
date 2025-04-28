import React, { useState, useEffect } from 'react';

const Peliculas = () => {
  const [movies, setMovies] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://api.disneyapi.dev/character?films=The%20Little%20Mermaid');
        const data = await response.json();
        setMovies(data.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const peliculasDeseadas = [
    "The Little Mermaid: Ariel's Beginning",
    "The Little Mermaid (live-action film)",
    "The Little Mermaid II: Return to the Sea",
    "Sleeping Beauty",
    "Oliver & Company",
    "Mickey's Magical Christmas: Snowed in at the House of Mouse",
    "Mickey's House of Villains",
    "Disney Princess Enchanted Tales: Follow Your Dreams",
    "Maleficent (film)",
    "Ralph Breaks the Internet",
    "Maleficent: Mistress of Evil",
    "The Return of Jafar",
    "Aladdin and the King of Thieves",
    "Cinderella III: A Twist in Time",
    "Tangled",
    "Aladdin (2019 film)",
    "Frozen II"
  ];


  const peliculasFiltradas = peliculasDeseadas.filter(pelicula =>
    pelicula.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      <h2>Listado de Películas</h2>
      <input 
        type="text" 
        placeholder="Buscar película..." 
        value={busqueda} 
        onChange={(e) => setBusqueda(e.target.value)} 
      />
      {peliculasFiltradas.length === 0 ? (
        <p>No se encontraron películas.</p>
      ) : (
        <ul>
          {peliculasFiltradas.map((pelicula, index) => (
            <li key={index}>{pelicula}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Peliculas;
