import React, { useEffect, useState } from 'react';

function Filtro({ onTipoChange }) {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const obtenerRoles = async () => {
      const response = await fetch('https://api.disneyapi.dev/character?films=The%20Little%20Mermaid');
      const data = await response.json();
      const uniqueRoles = [...new Set(data.data.map(character => character.role))];
      setRoles(['All', ...uniqueRoles]);
    };

    obtenerRoles();
  }, []);

  return (
    <div className="c-filtro">
      {roles.map((rol, index) => (
        <button className='' key={index} onClick={() => onTipoChange(rol)}>
          {rol}
        </button>
      ))}
    </div>
  );
}

export default Filtro;
