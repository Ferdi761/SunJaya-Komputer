import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HiPencil, HiTrash } from 'react-icons/hi'
import { formatCurrency } from '../../../util/formatCurrency'
import { useStore } from '../../../util/useStore'

const Barang = () => {
  const [barang, setBarang] = useState([
    {
      id: 0,
      foto: '',
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
        JenisBarang: {
          id: 0,
          nama: '',
        },
      },
    },
  ])

  const [loading, setLoading] = useState(true)

  const [q, setQ] = useState('')
  const [searchParam] = useState(['nama'])

  const { user } = useStore()

  const search = (rows: any) => {
    return rows.filter((row: any) =>
      searchParam.some(
        (newItem) =>
          row[newItem].toString().toLowerCase().indexOf(q) > -1
      )
    )
  }

  useEffect(() => {
    fetch('http://localhost:8000/api/barang')
      .then(async (res) => {
        const data = await res.json()
        setBarang(data)
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [loading])

  const handleDelete = (id: number) => {
    fetch(`http://localhost:8000/api/barang/hapus/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json()
        console.log(data)
        setLoading((prev) => !prev)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className='px-32 my-10'>
      <h1 className='font-bold text-2xl'>Daftar Barang</h1>
      <div className='flex flex-row justify-between'>
        <form className='group relative w-1/4 my-5'>
          <input
            className='focus:ring-2 focus:ring-black focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-3 ring-1 ring-slate-200 shadow-sm'
            type='text'
            aria-label='Cari Barang'
            placeholder='Cari Barang'
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <svg
            width='20'
            height='20'
            fill='currentColor'
            className='absolute right-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-black'
            aria-hidden='true'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
            />
          </svg>
        </form>
        <Link
          to='/admin/tambah-barang'
          className='text-blue-600 hover:text-blue-800 font-semibold underline'
        >
          Tambah Barang
        </Link>
      </div>

      <div className='grid grid-cols-2 gap-10'>
        {barang.map((item: any) => (
          <div
            className='bg-light flex flex-row gap-10 p-5'
            key={item.id}
          >
            <img
              src={item.foto}
              alt={item.Barang.nama}
              className='w-24 h-24'
            />
            <div className='flex flex-col'>
              <h3 className='font-semibold text-lg'>
                {item.Barang.nama}
              </h3>
              <div className='flex flex-row justify-between w-3/4'>
                <p>Jenis Barang: {item.Barang.JenisBarang.nama} </p>
                <p>Merk: {item.Barang.merek} </p>
              </div>
              <div className='flex flex-row justify-between w-3/4'>
                <p>Harga: {formatCurrency(item.Barang.harga)} </p>
                <p>Berat: {item.Barang.berat} gram</p>
              </div>
              <div className='flex flex-row justify-between w-3/4'>
                <p>Stok: {item.Barang.stok} buah</p>
                <p>ID: #{item.Barang.id}</p>
              </div>
              <p className='font-semibold'>Deskripsi</p>
              <p>{item.Barang.deskripsi}</p>
              <div className='flex flex-row gap-10 justify-center mt-5'>
                <p className='text-blue-700 flex flex-row gap-2 text-lg'>
                  <HiPencil className='w-6 h-6' /> edit
                </p>
                <button
                  className='bg-pink-500 hover:bg-pink-600 rounded-lg p-2'
                  onClick={() => handleDelete(item.BarangId)}
                >
                  <HiTrash className='text-white w-6 h-6' />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Barang
