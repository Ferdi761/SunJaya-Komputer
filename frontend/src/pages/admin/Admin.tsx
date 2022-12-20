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
import GaransiPembayaran from './pages/detail-garansi/GaransiPembayaran'
import GaransiDiskusi from './pages/detail-garansi/GaransiDiskusi'
import GaransiBelumDikirim from './pages/detail-garansi/GaransiBelumDikirim'
import GaransiDikirim from './pages/detail-garansi/GaransiDikirim'
import GaransiSelesai from './pages/detail-garansi/GaransiSelesai'
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
            <Route path='/garansi' element={<Garansi />} />
            <Route
              path='/garansi/pembayaran'
              element={<GaransiPembayaran />}
            />
            <Route
              path='/garansi/diskusi'
              element={<GaransiDiskusi />}
            />
            <Route
              path='/garansi/belum-dikirim'
              element={<GaransiBelumDikirim />}
            />
            <Route
              path='/garansi/dikirim'
              element={<GaransiDikirim />}
            />
            <Route
              path='/garansi/selesai'
              element={<GaransiSelesai />}
            />
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
