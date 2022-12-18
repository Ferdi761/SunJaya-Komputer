import { Route, Routes } from 'react-router-dom'

import Footer from './components/Footer'
import FormGaransi from './components/FormGaransi'

import Home from './pages/Home'
import ChatPage from './pages/ChatPage'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Pembayaran from './pages/Pembayaran'
import PesananSaya from './pages/PesananSaya'
import Register from './pages/Register'
import Search from './pages/Search'
import Example from './pages/Example'
import DetailProduk from './pages/DetailProduk'
import Cart from './pages/Cart'
import Admin from './pages/admin/Admin'

const App = () => (
  <>
    <Navbar />
    <Routes>
      <Route path='/admin/*' element={<Admin />} />
      <Route path='/keranjang' element={<Cart />} />
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/product/:id' element={<DetailProduk />} />
      <Route path='/pesanan-saya' element={<PesananSaya />} />
      <Route path='/chat' element={<ChatPage />} />
      <Route path='/bayar/:id' element={<Pembayaran />} />
      <Route path='/garansi' element={<FormGaransi />} />
      <Route path='/search' element={<Search />} />
      <Route path='/example' element={<Example />} />
    </Routes>
    <Footer />
  </>
)

export default App
