import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { formatCurrency } from '../../../util/formatCurrency'

import type { Pesanan } from '../../../util/type'
import { userStorage } from '../../../util/userStorage'

const DetailPesanan = () => {
  const [pesanan, setPesanan] = useState<Pesanan>()
  const [pengiriman, setPengiriman] = useState({
    biayaPengiriman: '',
    jasaPengiriman: '',
  })

  const { user } = userStorage()

  const { pathname } = useLocation()

  useEffect(() => {
    fetch(`http://localhost:8000/api/pemesanan/detail/1`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json()
        setPesanan(data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  let total: number = pesanan
    ? pesanan?.totalHargaBarang + parseInt(pengiriman.biayaPengiriman)
    : 0

  const handleDelete = () => {
    fetch(
      `http://localhost:8000/api/pemesanan/admin/batalkan/${
        pathname.split('/')[3]
      }`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    )
      .then(async (res) => {
        const data = await res.json()
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleSubmit = () => {
    fetch(
      `http://localhost:8000/api/pemesanan/admin/konfirmasi/${
        pathname.split('/')[3]
      }`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(pengiriman),
      }
    )
  }

  return (
    <div className='flex flex-row gap-10 mt-10 px-20'>
      <div className='w-1/2'>
        {pesanan?.Barangs.map((barang) => (
          <div
            key={barang.id}
            className='bg-light drop-shadow-xl h-fit flex p-3'
          >
            <div className='flex-none w-24 h-24 relative mr-5'>
              <img
                src={`http://localhost:8000/produk/${barang.FotoBarang.foto}`}
                alt={barang.nama}
                className='absolute inset-0 w-full h-full object-cover'
                loading='lazy'
              />
            </div>
            <div className='flex flex-col w-full'>
              <h3 className='text-lg font-semibold text-slate-900'>
                {barang.nama}
              </h3>
              <p>{formatCurrency(barang.harga)}/barang</p>
              <div className='flex flex-row gap-20'>
                <p>
                  Jumlah:{' '}
                  <span className='font-bold'>
                    {pesanan.Barangs.length} buah
                  </span>
                </p>
                <p>
                  Stok sisa:{' '}
                  <span className='font-bold'>
                    {barang.stok} buah
                  </span>
                </p>
              </div>
              <p>
                Total:{' '}
                <span className='font-bold'>
                  {formatCurrency(
                    barang.harga * pesanan.Barangs.length
                  )}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <form
        className='flex flex-col w-1/2 bg-dark text-white p-8 rounded-xl'
        onSubmit={handleSubmit}
      >
        <div className='flex flex-row justify-between'>
          <p>ID Pesanan : #{pesanan?.id}</p>
          <div className='flex flex-col gap-3'>
            <p>
              Tipe :{' '}
              <span className='font-bold uppercase text-lg'>
                pemesanan
              </span>
            </p>
            <p>
              Status :{' '}
              <span className='font-bold text-lg'>
                {pesanan?.status == 1
                  ? 'Menunggu Konfirmasi'
                  : pesanan?.status == 2
                  ? 'Menunggu Pembayaran'
                  : pesanan?.status == 3
                  ? 'Diproses'
                  : pesanan?.status == 4
                  ? 'Dikirim'
                  : 'Selesai'}
              </span>
            </p>
          </div>
        </div>
        <ul className='flex flex-col gap-3'>
          <li>
            Pemesan : {pesanan?.Akun.nama} #{pesanan?.Akun.id}
          </li>
          <li>
            Alamat Tujuan :{' '}
            <span className='font-bold'>{pesanan?.alamatTujuan}</span>
          </li>
          <li className='flex flex-row gap-7'>
            <p>Biaya Pengiriman : Rp</p>
            <input
              type='number'
              className='w-8/12 pl-3 text-black rounded-lg'
              placeholder='-- nominal tanpa titik --'
              onChange={(e) => {
                setPengiriman({
                  ...pengiriman,
                  biayaPengiriman: e.target.value,
                })
              }}
            />
          </li>
          <li className='flex flex-row gap-3'>
            <p>Jasa Pengiriman : </p>
            <input
              type='text'
              className='w-9/12 text-sm pl-3 text-black rounded-lg'
              placeholder='-- jasa pengiriman | tulis dalam format "nama jasa - tipe layanan" --'
            />
          </li>
          <li>
            Total Berat :{' '}
            {pesanan?.Barangs.reduce((acc, cur) => cur.berat, 0)} gram
          </li>
          <li className='font-bold text-lg'>
            Total Biaya :{' '}
            {pesanan
              ? formatCurrency(pesanan?.totalHargaBarang)
              : 'null'}
          </li>
        </ul>
        <div className='mb-4 flex justify-end'>
          <Link
            to='/admin/chat'
            className='text-center font-bold text-black bg-white rounded-full text-2xl py-2 px-5'
          >
            Diskusi Pengiriman
          </Link>
        </div>
        <div className='flex flex-row gap-10'>
          <button
            className='font-bold bg-red-600 w-1/2 rounded-full text-2xl py-2'
            onClick={() => handleDelete()}
          >
            Hapus Pesanan
          </button>
          <button
            className='font-bold uppercase bg-blue-700 w-1/2 rounded-full text-2xl py-2'
            type='submit'
          >
            konfirmasi
          </button>
        </div>
      </form>
    </div>
  )
}

export default DetailPesanan
