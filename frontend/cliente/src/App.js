import { BrowserRouter, Routes, Route } from "react-router-dom";
import Alumno from './components/Alumnos';
import Welcome from './components/Welcome';

import './App.css';

function App() {
  return <BrowserRouter>
  
    <div >
      <Routes>
        <Route path="/" element={<Welcome/>}/>
      </Routes>
    </div>
    </BrowserRouter>
}

export default App;
