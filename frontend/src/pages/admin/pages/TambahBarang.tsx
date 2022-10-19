import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'

const TambahBarang = () => {
  const [barang, setBarang] = React.useState({
    nama: '',
    harga: '',
    deskripsi: '',
    merek: '',
    berat: 0,
    jenis: '',
  })

  return (
    <div className='flex justify-center'>
      <form className='flex flex-col justify-center w-1/3'>
        <h1 className='uppercase font-bold text-2xl text-center mb-5'>
          Penambahan Data Barang
        </h1>

        <div className='mb-4'>
          <label className='block text-gray-700 text-md mb-2 font-semibold'>
            Nama
          </label>
          <input
            className='focus:ring-2 focus:ring-black focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-5 ring-1 ring-slate-200 shadow-sm'
            type='text'
            aria-label='Nama'
            placeholder='Nama'
            value={barang.nama}
            onChange={(e) =>
              setBarang({ ...barang, nama: e.target.value })
            }
          />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-md mb-2 font-semibold'>
            Harga
          </label>
          <div className='relative group'>
            <span className='absolute left-3 top-1/2 -mt-3 text-slate-400 pointer-events-none group-focus-within:text-black'>
              Rp
            </span>
            <input
              className='focus:ring-2 focus:ring-black focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm'
              type='text'
              aria-label='Harga'
              value={barang.harga}
              onChange={(e) =>
                setBarang({ ...barang, harga: e.target.value })
              }
            />
          </div>
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-md mb-2 font-semibold'>
            Deskripsi
          </label>
          <textarea
            className='focus:ring-2 focus:ring-black focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-5 ring-1 ring-slate-200 shadow-sm h-36'
            aria-label='Deskripsi'
            placeholder='Deskripsi'
            value={barang.deskripsi}
            onChange={(e) =>
              setBarang({ ...barang, deskripsi: e.target.value })
            }
          />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-md mb-2 font-semibold'>
            Merek
          </label>
          <input
            className='focus:ring-2 focus:ring-black focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-5 ring-1 ring-slate-200 shadow-sm'
            type='text'
            aria-label='Merek'
            placeholder='Merek'
            value={barang.merek}
            onChange={(e) =>
              setBarang({ ...barang, merek: e.target.value })
            }
          />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-md mb-2 font-semibold'>
            Harga
          </label>
          <div className='relative group'>
            <span className='absolute right-3 top-1/2 -mt-3 text-slate-400 pointer-events-none group-focus-within:text-black'>
              gram
            </span>
            <input
              className='focus:ring-2 focus:ring-black focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-5 ring-1 ring-slate-200 shadow-sm'
              type='number'
              aria-label='Berat'
              value={barang.berat}
              onChange={(e) =>
                setBarang({
                  ...barang,
                  berat: parseInt(e.target.value),
                })
              }
            />
          </div>
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-md mb-2 font-semibold'>
            Harga
          </label>
          <div className='relative group'>
            <span className='absolute right-3 top-1/2 -mt-2 text-slate-400 pointer-events-none group-focus-within:text-black'>
              <IoIosArrowDown />
            </span>
            <select
              className='focus:ring-2 focus:ring-black focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-5 ring-1 ring-slate-200 shadow-sm'
              aria-label='Berat'
              onChange={(e) =>
                setBarang({ ...barang, jenis: e.target.value })
              }>
              <option selected>Jenis Barang</option>
              <option value=''>Apapun</option>
              <option value=''>Apa aja</option>
            </select>
          </div>
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-md mb-2 font-semibold'>
            Foto Barang
          </label>
          <textarea
            className='focus:ring-2 focus:ring-black focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-5 ring-1 ring-slate-200 shadow-sm h-36'
            aria-label='Deskripsi'
          />
        </div>

        <button className='w-1/3 bg-black hover:bg-slate-700   text-white rounded-xl px-3 mb-5'>
          Upload Foto
        </button>

        <div className='flex justify-center'>
          <button
            className='bg-teal-700 text-white rounded-xl font-bold text-lg px-10 hover:bg-teal-900'
            type='submit'>
            SIMPAN
          </button>
        </div>
      </form>
    </div>
  )
}

export default TambahBarang
