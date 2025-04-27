import React, { useState, useEffect } from 'react';

const Cortometrajes = () => {
  const [shortFilms, setShortFilms] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShortFilms = async () => {
      try {
        const response = await fetch('https://api.disneyapi.dev/shorts');
        const data = await response.json();

        if (data && Array.isArray(data.data)) {
          setShortFilms(data.data);
        } else {
          setShortFilms([]);
        }
      } catch (error) {
        console.error('Error fetching short films:', error);
        setError('Error al cargar cortometrajes.');
      }
    };

    fetchShortFilms();
  }, []);

  return (
    <div>
      <h2>Listado de Cortometrajes de Disney</h2>
      {error && <p>{error}</p>}
      {shortFilms.length === 0 ? (
        <p></p>
      ) : (
        <ul>
          {shortFilms.map((film, index) => (
            <li key={index}>
              <h3>{film.title}</h3>
              <p>{film.description}</p>
              <img src={film.imageUrl} alt={film.title} style={{ maxWidth: '300px' }} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cortometrajes;
