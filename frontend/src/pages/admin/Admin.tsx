import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Pemesanan from './pages/Pemesanan'
import Garansi from './pages/Garansi'
import Barang from './pages/Barang'
import TambahBarang from './pages/TambahBarang'
import Akun from './pages/Akun'
import TambahAkun from './pages/TambahAkun'
import EditAkun from './pages/EditAkun'
import Rekening from './pages/Rekening'
import JenisBarang from './pages/JenisBarang'
// import PesananDiskusi from './pages/detail-pesanan/PesananDiskusi'
// import PesananPembayaran from './pages/detail-pesanan/PesananPembayaran'
// import PesananBelumDikirim from './pages/detail-pesanan/PesananBelumDikirim'
// import PesananDikirim from './pages/detail-pesanan/PesananDikirim'
// import PesananSelesai from './pages/detail-pesanan/PesananSelesai'
import ChatPage from './pages/ChatPage'

import { userStorage } from '../../util/userStorage'
import EditBarang from './pages/EditBarang'
import DetailPesanan from './pages/DetailPesanan'

const Admin = () => {
  const { user } = userStorage()

  if (!user) {
    return <h1>Anda tidak memiliki akses ke halaman ini</h1>
  } else {
    if (user.izin !== 'admin') {
      return <h1>Anda tidak memiliki akses ke halaman ini</h1>
    } else {
      return (
        <>
          <Navbar />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/pesanan' element={<Pemesanan />} />
            <Route path='/pesanan/:id' element={<DetailPesanan />} />
            {/* <Route
              path='/pesanan/diskusi'
              element={<PesananDiskusi />}
            />
            <Route
              path='/pesanan/pembayaran'
              element={<PesananPembayaran />}
            />
            <Route
              path='/pesanan/belum-dikirim'
              element={<PesananBelumDikirim />}
            />
            <Route
              path='/pesanan/dikirim'
              element={<PesananDikirim />}
            />
            <Route
              path='/pesanan/selesai'
              element={<PesananSelesai />}
            /> */}
            <Route path='/barang' element={<Barang />} />
            <Route path='/tambah-barang' element={<TambahBarang />} />
            <Route path='/edit-barang/:id' element={<EditBarang />} />
            <Route path='/akun' element={<Akun />} />
            <Route path='/tambah-akun' element={<TambahAkun />} />
            <Route path='/edit-akun/:id' element={<EditAkun />} />
            <Route path='/rekening' element={<Rekening />} />
            <Route path='/jenis-barang' element={<JenisBarang />} />
            <Route path='/chat/:id' element={<ChatPage />} />
          </Routes>
        </>
      )
    }
  }
}

export default Admin
