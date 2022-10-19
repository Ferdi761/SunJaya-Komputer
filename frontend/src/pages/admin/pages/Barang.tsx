import React from 'react'
import { Link } from 'react-router-dom'
import { HiPencil, HiTrash } from 'react-icons/hi'

const Barang = () => {
  return (
    <>
      <h1 className='font-bold text-2xl'>Daftar Barang</h1>
      <div className='flex flex-row justify-between'>
        <form className='group relative w-1/4 my-5'>
          <input
            className='focus:ring-2 focus:ring-black focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-3 ring-1 ring-slate-200 shadow-sm'
            type='text'
            aria-label='Cari Barang'
            placeholder='Cari Barang'
            // value={q}
            // onChange={(e) => setQ(e.target.value)}
          />
          <svg
            width='20'
            height='20'
            fill='currentColor'
            className='absolute right-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-black'
            aria-hidden='true'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
            />
          </svg>
        </form>
        <Link
          to='/tambah-barang'
          className='text-blue-600 hover:text-blue-800 font-semibold underline'>
          Tambah Barang
        </Link>
      </div>

      <div className='flex flex-row gap-10'>
        <div className='bg-light flex flex-row gap-10 w-1/2 p-5'>
          <img
            src='img/casing.png'
            alt='casing'
            className='w-24 h-24'
          />
          <div className='flex flex-col'>
            <h3 className='font-semibold text-lg'>
              Seken - Cpu Lenovo Ideacentre H50 Proc Core I5 4460 3,2
              Ghz S1150
            </h3>
            <div className='flex flex-row justify-between w-3/4'>
              <p>Jenis Barang: PC</p>
              <p>Merk: Lenovo</p>
            </div>
            <div className='flex flex-row justify-between w-3/4'>
              <p>Harga: Rp 2.000.000,-</p>
              <p>Berat: 2 Kg</p>
            </div>
            <div className='flex flex-row justify-between w-3/4'>
              <p>Stok: 13 buah</p>
              <p>ID: #1</p>
            </div>
            <p className='font-semibold'>Deskripsi</p>
            <p>
              PC Lenovo Ideacentre H50 Bekas, kualitas masih bagus
            </p>
            <div className='flex flex-row gap-10 justify-center mt-5'>
              <p className='text-blue-700 flex flex-row gap-2 text-lg'>
                <HiPencil className='w-6 h-6' /> edit
              </p>
              <button className='bg-pink-500 hover:bg-pink-600 rounded-lg p-2'>
                <HiTrash className='text-white w-6 h-6' />
              </button>
            </div>
          </div>
        </div>

        <div className='bg-light flex flex-row gap-10 w-1/2 p-5'>
          <img
            src='img/casing.png'
            alt='casing'
            className='w-24 h-24'
          />
          <div className='flex flex-col'>
            <h3 className='font-semibold text-lg'>
              Seken - Cpu Lenovo Ideacentre H50 Proc Core I5 4460 3,2
              Ghz S1150
            </h3>
            <div className='flex flex-row justify-between w-3/4'>
              <p>Jenis Barang: PC</p>
              <p>Merk: Lenovo</p>
            </div>
            <div className='flex flex-row justify-between w-3/4'>
              <p>Harga: Rp 2.000.000,-</p>
              <p>Berat: 2 Kg</p>
            </div>
            <div className='flex flex-row justify-between w-3/4'>
              <p>Stok: 13 buah</p>
              <p>ID: #1</p>
            </div>
            <p className='font-semibold'>Deskripsi</p>
            <p>
              PC Lenovo Ideacentre H50 Bekas, kualitas masih bagus
            </p>
            <div className='flex flex-row gap-10 justify-center mt-5'>
              <p className='text-blue-700 flex flex-row gap-2 text-lg'>
                <HiPencil className='w-6 h-6' /> edit
              </p>
              <button className='bg-pink-500 hover:bg-pink-600 rounded-lg p-2'>
                <HiTrash className='text-white w-6 h-6' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Barang
