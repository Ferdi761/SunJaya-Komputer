import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/home/Home';
import Footer from './components/footer/Footer';
import PesananSaya from './components/pesanan-saya/PesananSaya';
import Register from './components/register/Register';
import Login from './components/login/Login';
import DetailProduk from './components/detail-produk/DetailProduk';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/product/:id' element={<DetailProduk />} />
        <Route path='/pesanan-saya' element={<PesananSaya />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
