import { Listbox, Transition } from '@headlessui/react'
import { useState, useEffect, Fragment } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../../util/useStore'

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

  const [jenisSelected, setJenisSelected] = useState(jenis[0])

  const navigate = useNavigate()
  const { user } = useStore()

  useEffect(() => {
    fetch('http://localhost:8000/api/jenis', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json()
        setJenis(data.data)
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
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
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
          {/* <Listbox value={jenisSelected} onChange={setJenisSelected}>
            <div className='relative mt-1'>
              <Listbox.Button className='relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm border'>
                <span className='block truncate'>
                  {jenisSelected.nama}
                </span>
                <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                  <IoIosArrowDown />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave='transition ease-in duration-100'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                  {jenis.map((item) => (
                    <Listbox.Option
                      key={item.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? 'bg-amber-100 text-amber-900'
                            : 'text-gray-900'
                        }`
                      }
                      value={item.nama}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {item.nama}
                          </span>
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox> */}
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
