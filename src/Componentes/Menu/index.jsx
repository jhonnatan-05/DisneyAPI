import { Link } from 'react-router-dom';
import './style.css';

function Menu() {
  return (
    <nav className="c-menu">
      <Link to="/">Inicio</Link>
      <Link to="/personajes">Personajes</Link>
      <Link to="/peliculas">Películas</Link>
      <Link to="/cortometrajes">Cortometrajes</Link> {}
      <Link to="/favoritos">Favoritos</Link>
    </nav>
  );
}

export default Menu;
