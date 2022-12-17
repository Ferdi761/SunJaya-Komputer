import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import CartDetail from '../components/CartDetail'

import { formatCurrency } from '../util/formatCurrency'
import { userStorage } from '../util/userStorage'
import { cartStorage } from '../util/cartStorage'

const Cart = () => {
  const [cart, setCart] = useState({
    daftarBarang: [
      {
        jumlah: 0,
        akunId: 0,
        BarangId: 0,
        Barang: {
          stok: 0,
          id: 0,
          nama: '',
          harga: 0,
          deskripsi: '',
          merek: '',
          berat: 0,
          jenisId: 0,
          FotoBarang: {
            id: 0,
            foto: '',
            BarangId: 0,
          },
        },
      },
    ],
    totalHarga: 0,
  })

  const [alamat, setAlamat] = useState('')

  const { user } = userStorage()
  const { cartStatus, changeCart } = cartStorage()
  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:8000/api/keranjang', {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json()
        setCart(data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [cartStatus])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    fetch('http://localhost:8000/api/pemesanan/checkout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user?.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        alamatTujuan: alamat,
        jasaPengiriman: 'JNE',
        biayaPengiriman: 10000,
      }),
    })
      .then(async (res) => {
        const data = await res.json()
        if (data.status === 'success') {
          changeCart(!cartStatus)
          navigate('/pemesanan')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <div className='flex justify-center mb-10'>
        <div className='flex flex-col gap-5 w-10/12'>
          <p className='mt-10'>
            Menampilkan daftar barang dalam keranjang <br />
            Total barang: {cart.daftarBarang.length} jenis barang{' '}
            <br />
            Total Biaya: {formatCurrency(cart.totalHarga)}
          </p>

          <div className='flex flex-row gap-5'>
            <div className='w-7/12'>
              {cart.daftarBarang.length > 0 || true ? (
                cart.daftarBarang.map((item) => (
                  <CartDetail key={item.BarangId} {...item} />
                ))
              ) : (
                <div className='flex justify-center items-start bg-transparent text-black p-0'>
                  <p className='text-2xl mb-3'>
                    - Keranjang Kosong -
                  </p>
                </div>
              )}
            </div>
            <div className='w-5/12'>
              <div className='p-10 text-white bg-dark rounded-xl'>
                {cart.daftarBarang.length > 0 ? (
                  <>
                    <p className='text-2xl mb-3'>Rincian Keranjang</p>
                    <ul>
                      <li className='flex justify-between items-start bg-transparent text-white p-0'>
                        <p>Total Barang</p>
                        <p className='font-semibold'>
                          {cart.daftarBarang.length} Barang
                        </p>
                      </li>
                      <li className='flex justify-between items-start bg-transparent text-white p-0'>
                        <p>Total Berat</p>
                        <p className='font-semibold'>
                          {cart.daftarBarang.reduce(
                            (total, cartItem) => {
                              const item = cart.daftarBarang.find(
                                (i) =>
                                  i.Barang.id === cartItem.Barang.id
                              )
                              return (
                                total +
                                (item?.Barang.berat || 0) *
                                  cart.daftarBarang.length
                              )
                            },
                            0
                          )}{' '}
                          gram
                        </p>
                      </li>
                      <li className='flex justify-between items-start bg-transparent text-white p-0'>
                        <p>Total Belanja</p>
                        <p className='font-semibold'>
                          {formatCurrency(cart.totalHarga)}
                        </p>
                      </li>
                    </ul>
                    <form className='my-4' onSubmit={handleSubmit}>
                      <label className='block text-md mb-2 font-semibold'>
                        Alamat
                      </label>
                      <textarea
                        className='focus:ring-2 focus:ring-black focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-5 ring-1 ring-slate-200 shadow-sm h-36'
                        aria-label='Alamat'
                        placeholder='*Tulis secara lengkap, kecamatan, kota, dan provinsi'
                        value={alamat}
                        onChange={(e) => setAlamat(e.target.value)}
                      />
                      <button
                        className='bg-blue-700 hover:bg-blue-900 w-full rounded-xl font-bold text-2xl py-1 mt-10'
                        type='submit'
                      >
                        Pesan
                      </button>
                    </form>
                  </>
                ) : (
                  <>
                    <p className='text-center text-2xl'>
                      - Keranjang Kosong
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
