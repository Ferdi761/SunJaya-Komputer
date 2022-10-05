import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/home/Home';
import PesananSaya from './components/pesanan-saya/PesananSaya';
import Register from './components/register/Register';
import Login from './components/login/Login';
import DetailProduk from './components/detail-produk/DetailProduk';
import ChatPage from './components/chatpage/ChatPage';
import Cart from './components/cart/Cart';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} exact />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/product/:id' element={<DetailProduk />} />
        <Route path='/pesanan-saya' element={<PesananSaya />} />
        <Route path='/chat' element={<ChatPage />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
