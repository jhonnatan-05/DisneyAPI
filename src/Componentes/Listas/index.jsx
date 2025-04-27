import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Filtros from '../Filtros';
import './style.css';

function Listas() {
  const [data, setData] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtroRol, setFiltroRol] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const res = await fetch("https://api.disneyapi.dev/character?films=The%20Little%20Mermaid");
        const personajes = await res.json();
        setData(personajes.data);
      } catch (error) {
        console.error("Error al cargar personajes:", error);
      }
    };

    obtenerDatos();
  }, []);

  const filtrarPorRol = (personaje, rol) => {
    const nombre = personaje.name?.toLowerCase() || '';

    switch (rol) {
      case 'Reyes':
        return nombre.includes('king');
      case 'Reinas':
        return nombre.includes('queen');
      case 'Villanos':
        return nombre.includes('villain');
      case 'Héroes':
        return nombre.includes('hero');
      default:
        return true;
    }
  };

  const resultados = data.filter(personaje => {
    const coincideBusqueda = busqueda.length < 3 || personaje.name?.toLowerCase().includes(busqueda.toLowerCase());
    const coincideRol = filtrarPorRol(personaje, filtroRol);
    return coincideBusqueda && coincideRol;
  });

  return (
    <>
      {/* Código del componente Listas */}
    </>
  );
}

export default Listas;
