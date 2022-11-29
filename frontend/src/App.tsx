import { Route, Routes } from 'react-router-dom'
import { ShoppingCartProvider } from './util/ShoppingCartContext'
import Cart from './pages/Cart'
import ChatPage from './pages/ChatPage'
import DetailProduk from './pages/DetailProduk'
import Footer from './components/Footer'
import FormGaransi from './components/FormGaransi'
import Home from './pages/Home'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Pembayaran from './pages/Pembayaran'
import PesananSaya from './pages/PesananSaya'
import Register from './pages/Register'
import Search from './pages/Search'
import storeItems from './data/items.json'
import Example from './pages/Example'
import Admin from './pages/admin/Admin'
const App = () => (
  <ShoppingCartProvider>
    <Navbar />
    <Routes>
      <Route path='/admin/*' element={<Admin />} />
      <Route
        path='/keranjang'
        element={
          <div className='hidden'>
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
      <Route path='/search' element={<Search />} />
      <Route path='/example' element={<Example />} />
    </Routes>
    <Footer />
  </ShoppingCartProvider>
)

export default App
