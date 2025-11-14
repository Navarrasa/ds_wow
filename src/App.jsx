import { BrowserRouter } from 'react-router-dom';
import { Rotas } from './Rotas/Rotas'; 
import { HomePageIcon } from './Componentes/Home.jsx';

function App() {
  
  return (
    <BrowserRouter>
      <HomePageIcon />
      <Rotas />
    </BrowserRouter>
  )

}
export default App