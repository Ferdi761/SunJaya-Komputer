import { useState, useEffect, FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

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
      .then(async (res) => {
        const data = await res.json()
        if (data.status == 'success') {
          navigate('/admin/pesanan')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

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

  if (!pesanan) return <p>Loading...</p>

  return (
    <div className='flex flex-row gap-10 mt-10 px-20'>
      <div className='w-1/2'>
        {pesanan?.Barangs.map((barang) => (
          <div
            key={barang.id}
            className='bg-light drop-shadow-xl h-fit flex p-3 gap-2'
          >
            <img
              src={`http://localhost:8000/produk/${
                barang.FotoBarang.foto.split('\\')[2]
              }`}
              alt={barang.nama}
              className='w-1/4 h-auto'
              loading='lazy'
            />
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
          <li className='flex flex-row gap-3'>
            <p>Biaya Pengiriman :</p>
            {pesanan?.status == 1 ? (
              <input
                className='w-9/12 pl-3 text-black rounded-lg'
                placeholder='-- nominal tanpa titik --'
                value={pengiriman.biayaPengiriman}
                onChange={(e) => {
                  setPengiriman({
                    ...pengiriman,
                    biayaPengiriman: e.target.value,
                  })
                }}
              />
            ) : (
              <p>
                {pesanan?.biayaPengiriman
                  ? formatCurrency(pesanan?.biayaPengiriman)
                  : 0}
              </p>
            )}
          </li>
          <li className='flex flex-row gap-3'>
            <p>Jasa Pengiriman : </p>
            {pesanan?.status == 1 ? (
              <input
                type='text'
                className='w-9/12 text-sm pl-3 text-black rounded-lg'
                placeholder='e.g. JNE, TIKI, POS'
                value={pengiriman.jasaPengiriman}
                onChange={(e) => {
                  setPengiriman({
                    ...pengiriman,
                    jasaPengiriman: e.target.value,
                  })
                }}
              />
            ) : (
              <p>{pesanan?.jasaPengiriman}</p>
            )}
          </li>
          <li>
            Total Berat :{' '}
            {pesanan?.Barangs.reduce((acc, cur) => cur.berat, 0)} gram
          </li>
          <li className='font-bold text-lg'>
            Total Biaya :{' '}
            {pesanan
              ? pengiriman.biayaPengiriman
                ? formatCurrency(
                    pesanan?.totalHargaBarang +
                      parseInt(pengiriman.biayaPengiriman)
                  )
                : formatCurrency(pesanan?.totalHargaBarang)
              : 0}
          </li>
        </ul>
        {pesanan?.status == 1 ? (
          <div className='flex flex-col gap-4'>
            <Link
              to='/admin/chat'
              className='text-center font-bold text-black bg-white rounded-full text-2xl py-2 px-5 hover:bg-gray-300 w-1/2 self-end'
            >
              Diskusi Pengiriman
            </Link>
            <div className='flex flex-row'>
              <button
                className='font-bold bg-red-600 w-1/2 rounded-full text-2xl py-2 hover:bg-red-700'
                onClick={() => handleDelete()}
              >
                Hapus Pesanan
              </button>
              <button
                className='font-bold uppercase bg-blue-700 hover:bg-blue-800 w-1/2 rounded-full text-2xl py-2'
                type='submit'
              >
                konfirmasi
              </button>
            </div>
          </div>
        ) : pesanan?.status == 2 ? (
          <>
            <div className='bg-darkGrey'>
              <img src='' alt='' />
            </div>
            <div className='flex flex-row gap-10 mt-10'>
              <Link
                to='/admin/chat'
                className='font-bold bg-white hover:bg-gray-200 w-1/2 rounded-full text-2xl py-2 text-black text-center'
              >
                Diskusi Pengiriman
              </Link>
              <button
                className='font-bold uppercase bg-blue-700 hover:bg-blue-800 w-1/2 rounded-full text-2xl py-2'
                type='submit'
              >
                lunas
              </button>
            </div>
          </>
        ) : pesanan?.status == 3 ? (
          <div className='flex justify-center'>
            <p className='font-bold uppercase bg-blue-700 hover:bg-blue-800 w-1/2 rounded-full text-2xl py-2'>
              telah dikirim
            </p>
          </div>
        ) : pesanan?.status == 4 ? (
          <ul className='flex flex-col gap-3'>
            <li>Tanggal Pengiriman : {pesanan?.tanggalKirim}</li>
            <li>Tanggal Diterima : -</li>
            <li>Penilaian : -</li>
            <li>Testimoni</li>
            <li className='bg-darkGrey'>{pesanan?.testimoni}</li>
            <li className='flex justify-center'>
              <p className='font-bold uppercase bg-blue-700 hover:bg-blue-800 w-1/2 rounded-full text-2xl py-2'>
                telah dikirim
              </p>
            </li>
          </ul>
        ) : null}
      </form>
    </div>
  )
}

export default DetailPesanan
