import { Route, Routes } from 'react-router-dom'
import './App.css'
import AdminPage from './components/admin-pages/AdminPage'
import Cart from './components/cart/Cart'
import { ShoppingCartProvider } from './components/cart/ShoppingCartContext'
import ChatPage from './components/chatpage/ChatPage'
import DetailProduk from './components/detail-produk/DetailProduk'
import Footer from './components/footer/Footer'
import FormGaransi from './components/form-garansi/FormGaransi'
import Home from './components/home/Home'
import Login from './components/login/Login'
import Navbar from './components/navbar/Navbar'
import Pembayaran from './components/pembayaran/Pembayaran'
import PesananSaya from './components/pesanan-saya/PesananSaya'
import Register from './components/register/Register'
import storeItems from './data/items.json'

function App() {
  return (
    <ShoppingCartProvider>
      <Navbar />
      <Routes>
        <Route path='/admin/*' element={<AdminPage />} />
        <Route
          path='/keranjang'
          element={
            <div style={{ display: 'none' }}>
              <Cart />
            </div>
          }
        />
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        {storeItems.map((item) => {
          return (
            <Route
              path={`/product/${item.id}`}
              key={item.id}
              element={<DetailProduk {...item} />}
            />
          )
        })}
        <Route path='/pesanan-saya' element={<PesananSaya />} />
        <Route path='/chat' element={<ChatPage />} />
        <Route path='/pembayaran' element={<Pembayaran />} />
        <Route path='/garansi' element={<FormGaransi />} />
      </Routes>
      <Footer />
    </ShoppingCartProvider>
  )
}

export default App
