import './App.css';
import { Navbar } from './components/layout';
import { Home } from './components/home';
import { Products } from './components/products';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}
export default App;
