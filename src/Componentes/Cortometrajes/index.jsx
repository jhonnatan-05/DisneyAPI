import React, { useState, useEffect } from 'react';

const Cortometrajes = () => {
  const [shortFilms, setShortFilms] = useState([]);
  const [filteredShortFilms, setFilteredShortFilms] = useState([]);
  const [selectedShort, setSelectedShort] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShortFilms = async () => {
      try {
        let allShorts = [];

        for (let page = 1; page <= 5; page++) {
          const response = await fetch(`https://api.disneyapi.dev/character?page=${page}`);
          const data = await response.json();

          if (data && Array.isArray(data.data)) {
            data.data.forEach(character => {
              character.shortFilms.forEach(short => {
                if (!allShorts.includes(short)) {
                  allShorts.push(short);
                }
              });
            });
          }
        }

        setShortFilms(allShorts.sort());
        setFilteredShortFilms(allShorts.sort());
      } catch (error) {
        console.error('Error fetching short films:', error);
        setError('Error al cargar cortometrajes.');
      }
    };

    fetchShortFilms();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = shortFilms.filter(short => short.toLowerCase().includes(value));
    setFilteredShortFilms(filtered);
  };

  const handleSelectShort = (short) => {
    setSelectedShort(short);
  };

  return (
    <div>
      <h2>Listado de Cortometrajes de Disney</h2>
      {error && <p>{error}</p>}

      <input
        type="text"
        placeholder="Buscar cortometraje..."
        value={searchTerm}
        onChange={handleSearch}
      />

      {filteredShortFilms.length === 0 ? (
        <p>No se encontraron cortometrajes.</p>
      ) : (
        <ul>
          {filteredShortFilms.map((short, index) => (
            <li 
              key={index}
              onClick={() => handleSelectShort(short)} 
              style={{ cursor: 'pointer', color: selectedShort === short ? 'blue' : 'black' }}
            >
              {short}
            </li>
          ))}
        </ul>
      )}

      {selectedShort && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid gray', borderRadius: '8px' }}>
          <h3>Información del cortometraje</h3>
          <p><strong>Nombre:</strong> {selectedShort}</p>
          <p><em></em></p>
        </div>
      )}
    </div>
  );
};

export default Cortometrajes;
