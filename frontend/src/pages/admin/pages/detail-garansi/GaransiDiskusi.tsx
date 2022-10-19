import React from 'react'
import { Link } from 'react-router-dom'

const GaransiDiskusi = () => {
  return (
    <div className='flex flex-row gap-10'>
      <div className='flex font-sans p-3 w-1/2 bg-light drop-shadow-xl h-fit'>
        <div className='flex-none w-24 h-24 relative mr-5'>
          <img
            src='img/produk/cpu-corei3.png'
            alt=''
            className='absolute inset-0 w-full h-full object-cover'
            loading='lazy'
          />
        </div>
        <div className='flex flex-col w-full'>
          <h3 className='text-lg font-semibold text-slate-900'>
            Core I5-7400 3,0 Ghz Gen7 Kabylake - Socket 1151
          </h3>
          <p>Rp 950.000/barang</p>
          <div className='flex flex-row gap-20'>
            <p>
              Jumlah: <span className='font-bold'>1 buah</span>
            </p>
            <p>
              Stok sisa: <span className='font-bold'>4 buah</span>
            </p>
          </div>
          <p>ID Barang : #21</p>
        </div>
      </div>

      <div className='flex flex-col w-1/2 bg-dark text-white p-8 rounded-xl'>
        <div className='flex flex-row justify-between'>
          <div className='flex flex-col gap-3'>
            <p>ID Garansi : #17</p>
            <p>ID Pesanan : #17</p>
          </div>
          <div className='flex flex-col gap-3'>
            <p>
              Tipe :{' '}
              <span className='font-bold uppercase text-lg'>
                garansi
              </span>
            </p>
            <p>
              Status :{' '}
              <span className='font-bold text-lg'>Pembayaran</span>
            </p>
          </div>
        </div>
        <ul className='flex flex-col gap-3'>
          <li>Pemesan : Jabalnur #213</li>
          <li>
            Alamat Tujuan :{' '}
            <span className='font-bold'>
              Jl. Pegangsaan Timur No. 56, Jakarta Pusat, DKI Jakarta
            </span>
          </li>
          <li className='flex flex-row gap-3'>
            <p>Biaya Pengiriman : Rp</p>
            <input
              type='text'
              className='w-96 pl-3 text-black rounded-lg'
              placeholder='-- nominal tanpa titik --'
            />
          </li>
          <li className='flex flex-row gap-3'>
            <p className=''>Jasa Pengiriman : </p>
            <input
              type='text'
              className='w-9/12 text-sm pl-3 text-black rounded-lg'
              placeholder='-- jasa pengiriman | tulis dalam format "nama jasa - tipe layanan" --'
            />
          </li>
          <li>Total Berat : 500 gram</li>
        </ul>
        <div className='my-4'>
          <label className='block text-md mb-2 font-semibold'>
            Keluhan
          </label>
          <textarea
            className='focus:ring-2 focus:ring-black focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-3 ring-1 ring-slate-200 shadow-sm h-36'
            aria-label='Alamat'
            placeholder='Contoh: Tidak dapat bekerja'
            // value={akun.alamat}
            // onChange={(e) =>
            //   setAkun({ ...akun, alamat: e.target.value })
            // }
          />
        </div>
        <p className='mb-3'>
          Bukti kerusakan :{' '}
          <span className='text-blue-600 underline'>
            21n1opsf789fag.png
          </span>
        </p>
        <p className='mb-3'>
          Tanggal pesanan diterima : 06 April 2022 13:23
        </p>
        <div className='mb-4 flex justify-end'>
          <Link
            to='/chat'
            className='text-center font-bold text-black bg-white rounded-full text-2xl py-2 px-5'>
            Diskusi Pengiriman
          </Link>
        </div>
        <div className='flex flex-row gap-10'>
          <button className='font-bold bg-red-600 w-1/2 rounded-full text-2xl py-2'>
            Tolak
          </button>
          <button className='font-bold uppercase bg-blue-700 w-1/2 rounded-full text-2xl py-2'>
            disetujui
          </button>
        </div>
      </div>
    </div>
  )
}

export default GaransiDiskusi
