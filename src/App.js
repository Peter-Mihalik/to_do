import {Route, Routes, BrowserRouter} from 'react-router-dom'
 
import Home from "./pages/Home";
import List from './pages/List';

function App() {
  return (
    <BrowserRouter>
    
      <Routes>

        <Route path='/' element={<Home/>}/>
        <Route path='/list/:id' element={<List/>}/>

      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
