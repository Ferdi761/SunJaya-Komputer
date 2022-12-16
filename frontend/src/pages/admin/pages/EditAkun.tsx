import { FormEvent, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useStore } from '../../../util/useStore'

const EditAkun = () => {
  const [akun, setAkun] = useState({
    nama: '',
    email: '',
    password: '',
    noTelp: '',
    alamat: '',
    jenis: '',
    izin: 'karyawan',
  })

  const navigate = useNavigate()
  const { user } = useStore()
  const location = useLocation()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    fetch(
      `http://localhost:8000/api/karyawan/${
        location.pathname.split('/')[3]
      }`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(akun),
      }
    )
      .then(async (res) => {
        const data = await res.json()
        console.log(data)
        navigate('/admin/akun')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetch(
      `http://localhost:8000/api/akun/karyawan/${
        location.pathname.split('/')[3]
      }`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    )
      .then(async (res) => {
        const data = await res.json()
        setAkun(data.data)
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className='flex justify-center my-20'>
      <form
        className='flex flex-col justify-center w-1/3'
        onSubmit={handleSubmit}
      >
        <h1 className='uppercase font-bold text-2xl text-center mb-5'>
          Penambahan Akun Karyawan
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
            value={akun.nama}
            onChange={(e) =>
              setAkun({ ...akun, nama: e.target.value })
            }
          />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-md mb-2 font-semibold'>
            Email
          </label>
          <input
            className='focus:ring-2 focus:ring-black focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-5 ring-1 ring-slate-200 shadow-sm'
            type='text'
            aria-label='email'
            placeholder='Email'
            value={akun.email}
            onChange={(e) =>
              setAkun({ ...akun, email: e.target.value })
            }
          />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-md mb-2 font-semibold'>
            Password
          </label>
          <input
            className='focus:ring-2 focus:ring-black focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-5 ring-1 ring-slate-200 shadow-sm'
            type='password'
            aria-label='password'
            placeholder='Password'
            value={akun.password}
            onChange={(e) =>
              setAkun({ ...akun, password: e.target.value })
            }
          />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-md mb-2 font-semibold'>
            Masukkan Ulang Password
          </label>
          <input
            className='focus:ring-2 focus:ring-black focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-5 ring-1 ring-slate-200 shadow-sm'
            type='password'
            aria-label='password'
            placeholder='Password'
            onChange={(e) =>
              akun.password === e.target.value &&
              setAkun({ ...akun, password: e.target.value })
            }
          />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-md mb-2 font-semibold'>
            No Telp
          </label>
          <div className='relative group'>
            <input
              className='focus:ring-2 focus:ring-black focus:outline-none appearance-none w-full text-md leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-5 ring-1 ring-slate-200 shadow-sm'
              type='number'
              placeholder='No Telp'
              aria-label='noTelp'
              value={akun.noTelp}
              onChange={(e) =>
                setAkun({
                  ...akun,
                  noTelp: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-md mb-2 font-semibold'>
            Alamat
          </label>
          <textarea
            className='focus:ring-2 focus:ring-black focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-5 ring-1 ring-slate-200 shadow-sm h-36'
            aria-label='Alamat'
            placeholder='Alamat'
            value={akun.alamat}
            onChange={(e) =>
              setAkun({ ...akun, alamat: e.target.value })
            }
          />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-md mb-2 font-semibold'>
            Izin
          </label>
          <input
            className='focus:ring-2 focus:ring-black focus:outline-none appearance-none w-full text-md leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-12 ring-1 ring-slate-200 shadow-sm'
            type='text'
            aria-label='izin'
            disabled={true}
            value={akun.izin}
            onChange={(e) =>
              setAkun({
                ...akun,
                izin: e.target.value,
              })
            }
          />
        </div>

        <div className='flex justify-center'>
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

export default EditAkun
