import { Listbox } from '@headlessui/react'
import { useState, useEffect } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

const TambahBarang = () => {
  const [barang, setBarang] = useState({
    nama: '',
    harga: '',
    deskripsi: '',
    merek: '',
    berat: '',
    jenis: '',
    foto: {
      preview: '',
      data: '',
    },
  })

  const [jenis, setJenis] = useState([
    {
      id: 0,
      nama: '',
    },
  ])

  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:8000/api/jenis')
      .then(async (res) => {
        const data = await res.json()
        setJenis(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleFileChange = (e: any) => {
    const foto = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setBarang({ ...barang, foto })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('namaBarang', barang.nama)
    formData.append('harga', barang.harga)
    formData.append('deskripsi', barang.deskripsi)
    formData.append('merek', barang.merek)
    formData.append('berat', barang.berat)
    formData.append('jenis', barang.jenis)
    formData.append('foto', barang.foto.data)
    formData.append('stok', '100')

    fetch('http://localhost:8000/api/barang/tambah', {
      method: 'POST',
      body: formData,
    })
      .then(async (res) => {
        const data = await res.json()
        console.log(data)
        alert(data.message)
        navigate('/admin/barang')
      })
      .catch((err) => {
        console.log(err)
        alert(err.message)
      })
  }

  return (
    <div className='flex justify-center my-10'>
      <form
        className='flex flex-col justify-center w-1/3'
        onSubmit={handleSubmit}
      >
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
              type='number'
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
            Berat
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
                  berat: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-md mb-2 font-semibold'>
            Jenis Barang
          </label>
          <div className='relative group'>
            <span className='absolute right-3 top-1/2 -mt-2 text-slate-400 pointer-events-none group-focus-within:text-black'>
              <IoIosArrowDown />
            </span>
            <select
              className='focus:ring-2 focus:ring-black focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-5 ring-1 ring-slate-200 shadow-sm'
              aria-label='jenis'
              onChange={(e) =>
                setBarang({ ...barang, jenis: e.target.value })
              }
            >
              <option value=''>Pilih Jenis Barang</option>
              {jenis.map((item) => (
                <option key={item.id} value={item.nama}>
                  {item.nama}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-md mb-2 font-semibold'>
            Foto Barang
          </label>
          {barang.foto.preview !== '' && barang.foto.data !== '' && (
            <img
              src={barang.foto.preview}
              className='w-1/3'
              alt='foto'
            />
          )}
        </div>

        <input
          type='file'
          name='file'
          className='mb-5'
          onChange={handleFileChange}
        />

        <div className='flex justify-center mt-5'>
          <button
            className='bg-teal-700 text-white rounded-xl font-bold text-lg px-10 hover:bg-teal-900'
            type='submit'
          >
            SIMPAN
          </button>
        </div>
      </form>
    </div>
  )
}

export default TambahBarang
