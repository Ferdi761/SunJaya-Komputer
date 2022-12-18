import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { cartStorage } from '../util/cartStorage'
import { formatCurrency } from '../util/formatCurrency'
import { userStorage } from '../util/userStorage'

const DetailProduk = () => {
  const [barang, setBarang] = useState({
    id: 0,
    foto: '',
    BarangId: '',
    Barang: {
      stok: '',
      id: '',
      nama: '',
      harga: 0,
      deskripsi: '',
      merek: '',
      berat: '',
      jenisId: '',
      JenisBarang: {
        id: '',
        nama: '',
      },
    },
  })

  const location = useLocation()
  const { user } = userStorage()
  const { cartStatus, changeCart } = cartStorage()

  useEffect(() => {
    fetch(
      `http://localhost:8000/api/barang/${
        location.pathname.split('/')[2]
      }`
    )
      .then(async (res) => {
        const data = await res.json()
        setBarang(data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [cartStatus])

  const tambahCart = (id: number) => {
    const data = {
      barangId: barang.id,
      jumlah: 1,
    }

    fetch(`http://localhost:8000/api/keranjang/${id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user?.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        const data = await res.json()
        if (data.status === 'success') {
          changeCart()
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <div className='flex justify-center'>
        <div className='w-11/12 flex flex-row gap-10 my-10'>
          <div className='w-8/12'>
            <div
              className='flex flex-col'
              style={{ width: '50rem', height: '25rem' }}
            >
              <div className='flex justify-center bg-black rounded-t-xl'>
                <img
                  src={`http://localhost:8000/produk/${
                    barang.foto.split('\\')[2]
                  }`}
                  alt='cpu'
                  className='w-60 h-60'
                />
              </div>
              <div className='border border-black rounded-b-xl px-10'>
                <h5 className='font-bold border-b border-gray-500 py-2'>
                  Deskripsi
                </h5>
                <p className='py-3'>{barang.Barang.deskripsi}</p>
              </div>
            </div>
          </div>
          <div className='w-4/12'>
            <div className='flex flex-col border border-black rounded-xl p-10'>
              <div className='flex flex-col gap-2'>
                <h5 className='text-2xl font-bold'>
                  {formatCurrency(barang.Barang.harga)}
                </h5>
                <p className='text-lg'>{barang.Barang.nama} </p>
                <p>Stok sisa: {barang.Barang.stok} buah</p>
                <p>Berat: {barang.Barang.berat} gram</p>
                <div className='text-center mt-5'>
                  <button
                    className='bg-blue-700 text-white hover:bg-blue-900 rounded-full px-10 py-2'
                    onClick={() => tambahCart(barang.id)}
                  >
                    {/* {quantity > 0
                      ? 'Tambah ke keranjang'
                      : 'Masukkan keranjang'} */}
                    Masukkan keranjang
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailProduk
