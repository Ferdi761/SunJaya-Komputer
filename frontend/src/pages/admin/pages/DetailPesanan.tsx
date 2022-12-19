import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

import type { Pesanan } from '../../../util/type'
import { userStorage } from '../../../util/userStorage'

const DetailPesanan = () => {
  const [pesanan, setPesanan] = useState<Pesanan>()

  const { user } = userStorage()

  const { pathname } = useLocation()

  useEffect(() => {
    fetch(`http://localhost:8000/api/pemesanan/1`, {
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

  return (
    <div className='flex flex-row gap-10 mt-10 px-20'>
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
          <p>
            Total: <span className='font-bold'>Rp 950.000</span>
          </p>
        </div>
      </div>

      <div className='flex flex-col w-1/2 bg-dark text-white p-8 rounded-xl'>
        <div className='flex flex-row justify-between'>
          <p>ID Pesanan : #17</p>
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
          <li className='flex flex-row gap-7'>
            <p>Biaya Pengiriman : Rp</p>
            <input
              type='text'
              className='w-8/12 pl-3 text-black rounded-lg'
              placeholder='-- nominal tanpa titik --'
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
          <li>Total Berat : 500 gram</li>
          <li className='font-bold text-lg'>
            Total Biaya : Rp 3.060.000
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
          <button className='font-bold uppercase bg-blue-700 w-1/2 rounded-full text-2xl py-2'>
            konfirmasi
          </button>
        </div>
      </div>
    </div>
  )
}

export default DetailPesanan
