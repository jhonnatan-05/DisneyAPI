import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Peliculas from './Componentes/Peliculas'; 
import Filtros from './Componentes/Filtros';
import Favoritos from './Componentes/Favoritos';
import Listas from './Componentes/Listas';
import Personajes from './Componentes/Personajes'; 
import Cortometrajes from './Componentes/Cortometrajes'; 
import Menu from './Componentes/Menu';
import './App.css';

function App() {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/peliculas" element={<Peliculas />} />
        <Route path="/filtros" element={<Filtros />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/" element={<Listas />} />
        <Route path="/personajes" element={<Personajes />} />
        <Route path="/cortometrajes" element={<Cortometrajes />} />
      </Routes>
    </Router>
  );
}

export default App;
