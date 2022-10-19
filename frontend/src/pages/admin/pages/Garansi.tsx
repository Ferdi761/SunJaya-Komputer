import React from 'react'
import { Link } from 'react-router-dom'
import { BsFillBagFill } from 'react-icons/bs'
import TabelGaransi from '../components/TabelGaransi'

const Garansi = () => {
  return (
    <>
      <h1 className='flex flex-row gap-5 text-2xl'>
        <BsFillBagFill /> Ajuan Garansi Pelanggan
      </h1>
      <div className='flex flex-row justify-between items-center mt-7'>
        <ul className='flex flex-row gap-5'>
          <li className='text-lg'>Semua</li>
          <li className='text-lg'>Belum Dikonfirmasi</li>
          <li className='text-lg'>Dikirim</li>
          <li className='text-lg'>Selesai</li>
        </ul>
        <Link
          to='/pesanan'
          className='text-blue-600 font-semibold hover:text-blue-700'>
          Daftar Pesanan
        </Link>
      </div>
      <form className='group relative w-1/4 mt-5'>
        <svg
          width='20'
          height='20'
          fill='currentColor'
          className='absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-black'
          aria-hidden='true'>
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
      <h3 className='text-xl font-semibold mt-5'>99 Ajuan Garansi</h3>

      <ul className='w-full flex flex-row gap-5 bg-secondary rounded-lg p-4 mt-3 mb-5'>
        <li className='w-1/2'>Produk</li>
        <li className='w-1/6 ml-20'>ID Pemesanan</li>
        <li className='w-1/5'>Tanggal Pesan</li>
        <li className='w-1/6'>Status</li>
        <li className='w-1/7 pr-6'>Aksi</li>
      </ul>
      <TabelGaransi />
      <TabelGaransi />
      <TabelGaransi />
    </>
  )
}

export default Garansi
