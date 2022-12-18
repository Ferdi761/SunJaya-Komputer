import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BsFillBagFill } from 'react-icons/bs'

import TabelPesanan from '../components/TabelPesanan'

import type { Pesanan } from '../../../util/type'
import { userStorage } from '../../../util/userStorage'
import { HiChatBubbleLeftRight } from 'react-icons/hi2'
import { formatCurrency } from '../../../util/formatCurrency'

const Pemesanan = () => {
  const [pesanan, setPesanan] = useState<Pesanan[]>([])
  const [statusPesanan, setStatusPesanan] = useState(0)

  const { user } = userStorage()

  useEffect(() => {
    fetch('http://localhost:8000/api/pemesanan/admin', {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json()
        setPesanan(data.data)
        console.log(data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [statusPesanan])

  const handleConfirm = (id: number) => {
    fetch(
      `http://localhost:8000/api/pemesanan/admin/konfirmasi/${id}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    )
      .then(async (res) => {
        const data = await res.json()
        if (data.status === 'success') {
          setStatusPesanan(statusPesanan + 1)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className='flex justify-center'>
      <div className='w-2/3 my-20'>
        <h1 className='flex flex-row gap-5 text-2xl'>
          <BsFillBagFill /> Pesanan Pelanggan
        </h1>
        <div className='flex flex-row justify-between items-center mt-7'>
          <ul className='flex flex-row gap-5'>
            <li className='text-lg'>Semua</li>
            <li className='text-lg'>Belum Dibayar</li>
            <li className='text-lg'>Sedang Diproses</li>
            <li className='text-lg'>Dikirim</li>
            <li className='text-lg'>Selesai</li>
          </ul>
          <Link
            to='/admin/garansi'
            className='text-blue-600 font-semibold hover:text-blue-700'
          >
            Daftar Klaim Garansi
          </Link>
        </div>
        <form className='group relative w-1/4 mt-5'>
          <svg
            width='20'
            height='20'
            fill='currentColor'
            className='absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-black'
            aria-hidden='true'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
            />
          </svg>
          <input
            className='focus:ring-2 focus:ring-black focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm'
            type='text'
            aria-label='Cari Pesanan'
            placeholder='Cari Pesanan'
            // value={q}
            // onChange={(e) => setQ(e.target.value)}
          />
        </form>
        <h3 className='text-xl font-semibold mt-5'>99 Pesanan</h3>

        <ul className='w-full grid grid-cols-4 gap-5 bg-secondary rounded-lg p-4 mt-3 mb-5'>
          <li className='w-1/2'>Produk</li>
          <li>Total Bayar</li>
          <li>Tanggal</li>
          <div className='grid grid-cols-4 gap-32'>
            <li>Status</li>
            <li>Aksi</li>
          </div>
        </ul>
        {pesanan.map((item) => (
          <div className='rounded-lg bg-light py-2 mb-10'>
            <div className='flex flex-row gap-10 px-5 mb-2 shadow-lg'>
              <p>
                Achmad Ferdiansyah
                <br />
                ID: #{item.akunId}
              </p>
              <Link to='/admin/chat'>
                <HiChatBubbleLeftRight className='w-8 h-8 text-blue-500' />
              </Link>
            </div>
            <div className='px-5'>
              <p className='w-full border-b'>
                ID pesanan: #{item.id}
              </p>
              <div className='grid grid-cols-4 gap-5 mt-5'>
                <div className='flex flex-col gap-10'>
                  {item.Barangs.map((barang) => (
                    <>
                      <img
                        src={`http://localhost:8000/produk/${
                          barang.FotoBarang.foto.split('\\')[2]
                        }`}
                        alt={barang.nama}
                        className='w-1/2 h-1/2'
                        loading='lazy'
                      />
                      <div>
                        <h3 className='text-lg font-semibold text-slate-900'>
                          {barang.nama}
                        </h3>
                        <p>
                          Jumlah:{' '}
                          <span className='font-bold'>
                            {barang.BarangYangDipesan.jumlah} buah
                          </span>
                        </p>
                      </div>
                    </>
                  ))}
                </div>
                <p className='text-lg font-normal text-slate-900'>
                  {formatCurrency(
                    item.Barangs.reduce(
                      (acc, cur) =>
                        acc +
                        cur.BarangYangDipesan.jumlah * cur.harga,
                      0
                    )
                  )}
                </p>
                <p className='text-lg font-normal text-slate-900'>
                  {item.status == 1
                    ? '-'
                    : item.tanggalMulaiMenungguPembayaran}
                </p>
                <div className='flex flex-col w-full'>
                  <div className='grid grid-cols-2 gap-3'>
                    <p className='text-lg font-normal text-slate-900'>
                      {item.status == 1
                        ? 'Menunggu Konfirmasi'
                        : item.status == 2
                        ? 'Menunggu Pembayaran'
                        : item.status == 3
                        ? 'Sedang Diproses'
                        : item.status == 4
                        ? 'Dikirim'
                        : 'Selesai'}
                    </p>
                    {item.status == 1 ? (
                      <button
                        className='text-lg font-normal text-blue-500 hover:text-blue-700'
                        onClick={() => handleConfirm(item.id)}
                      >
                        Konfirmasi
                      </button>
                    ) : (
                      <Link
                        to={`/admin/pesanan/${item.id}`}
                        className='text-lg font-normal text-blue-500 hover:text-blue-700'
                      >
                        Detail
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Pemesanan
