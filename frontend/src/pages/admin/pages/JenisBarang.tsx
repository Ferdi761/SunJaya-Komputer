import React from 'react'
import { HiPencil, HiTrash } from 'react-icons/hi2'
import { BsPlusCircleFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const JenisBarang = () => {
  return (
    <div className='px-96'>
      <h1 className='font-bold text-2xl uppercase'>
        daftar jenis barang
      </h1>
      <form className='group relative w-1/2 my-5'>
        <input
          className='focus:ring-2 focus:ring-black focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-3 ring-1 ring-slate-200 shadow-sm'
          type='text'
          aria-label='Cari Jenis Barang'
          placeholder='Cari Jenis Barang'
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

      <div className='flex flex-col gap-10'>
        <div className='bg-light flex flex-row gap-10 p-5 rounded-lg shadow-xl'>
          <div className='flex flex-col w-full text-center'>
            <h3 className='mb-3'>
              ID : <span className='font-semibold'>#1</span>
            </h3>
            <p className='font-bold uppercase text-lg'>cpu</p>
            <div className='flex flex-row gap-10 justify-center mt-5'>
              <Link
                to='/edit-akun'
                className='text-blue-700 flex flex-row gap-2 text-lg mt-2'>
                <HiPencil className='w-6 h-6' /> edit
              </Link>
              <button className='bg-pink-500 hover:bg-pink-600 rounded-lg p-2'>
                <HiTrash className='text-white w-6 h-6' />
              </button>
            </div>
          </div>
        </div>

        <div className='bg-light flex flex-row gap-10 p-5 rounded-lg shadow-xl'>
          <div className='flex flex-col w-full text-center'>
            <h3 className='mb-3'>
              ID : <span className='font-semibold'>#2</span>
            </h3>
            <p className='font-bold text-lg'>Monitor</p>
            <div className='flex flex-row gap-10 justify-center mt-5'>
              <Link
                to='/edit-akun'
                className='text-blue-700 flex flex-row gap-2 text-lg mt-2'>
                <HiPencil className='w-6 h-6' /> edit
              </Link>
              <button className='bg-pink-500 hover:bg-pink-600 rounded-lg p-2'>
                <HiTrash className='text-white w-6 h-6' />
              </button>
            </div>
          </div>
        </div>

        <div className='bg-light flex flex-row gap-10 p-5 rounded-lg shadow-xl'>
          <div className='flex flex-col w-full text-center'>
            <h3 className='mb-3'>
              ID : <span className='font-semibold'>#3</span>
            </h3>
            <p className='font-bold uppercase text-lg'>gpu</p>
            <div className='flex flex-row gap-10 justify-center mt-5'>
              <Link
                to='/edit-akun'
                className='text-blue-700 flex flex-row gap-2 text-lg mt-2'>
                <HiPencil className='w-6 h-6' /> edit
              </Link>
              <button className='bg-pink-500 hover:bg-pink-600 rounded-lg p-2'>
                <HiTrash className='text-white w-6 h-6' />
              </button>
            </div>
          </div>
        </div>

        <button className='bg-light flex flex-row gap-10 p-5 rounded-lg shadow-xl justify-center uppercase font-bold'>
          <BsPlusCircleFill className='w-6 h-6 -mr-7' />
          tambah baru
        </button>
      </div>
    </div>
  )
}

export default JenisBarang
