import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Pesanan from './pages/Pesanan'
import Garansi from './pages/Garansi'
import Barang from './pages/Barang'
import TambahBarang from './pages/TambahBarang'
import Akun from './pages/Akun'
import TambahAkun from './pages/TambahAkun'
import EditAkun from './pages/EditAkun'
import Rekening from './pages/Rekening'
import JenisBarang from './pages/JenisBarang'
import GaransiPembayaran from './pages/detail-garansi/GaransiPembayaran'
import GaransiDiskusi from './pages/detail-garansi/GaransiDiskusi'
import GaransiBelumDikirim from './pages/detail-garansi/GaransiBelumDikirim'
import GaransiDikirim from './pages/detail-garansi/GaransiDikirim'
import GaransiSelesai from './pages/detail-garansi/GaransiSelesai'
import PesananDiskusi from './pages/detail-pesanan/PesananDiskusi'
import PesananPembayaran from './pages/detail-pesanan/PesananPembayaran'
import PesananBelumDikirim from './pages/detail-pesanan/PesananBelumDikirim'
import PesananDikirim from './pages/detail-pesanan/PesananDikirim'
import PesananSelesai from './pages/detail-pesanan/PesananSelesai'
import Login from './pages/Login'

const Admin = () => (
  <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/pesanan' element={<Pesanan />} />
      <Route path='/pesanan/diskusi' element={<PesananDiskusi />} />
      <Route
        path='/pesanan/pembayaran'
        element={<PesananPembayaran />}
      />
      <Route
        path='/pesanan/belum-dikirim'
        element={<PesananBelumDikirim />}
      />
      <Route path='/pesanan/dikirim' element={<PesananDikirim />} />
      <Route path='/pesanan/selesai' element={<PesananSelesai />} />
      <Route path='/garansi' element={<Garansi />} />
      <Route
        path='/garansi/pembayaran'
        element={<GaransiPembayaran />}
      />
      <Route path='/garansi/diskusi' element={<GaransiDiskusi />} />
      <Route
        path='/garansi/belum-dikirim'
        element={<GaransiBelumDikirim />}
      />
      <Route path='/garansi/dikirim' element={<GaransiDikirim />} />
      <Route path='/garansi/selesai' element={<GaransiSelesai />} />
      <Route path='/barang' element={<Barang />} />
      <Route path='/tambah-barang' element={<TambahBarang />} />
      <Route path='/akun' element={<Akun />} />
      <Route path='/tambah-akun' element={<TambahAkun />} />
      <Route path='/edit-akun' element={<EditAkun />} />
      <Route path='/rekening' element={<Rekening />} />
      <Route path='/jenis-barang' element={<JenisBarang />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  </>
)

export default Admin
