import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userStorage } from '../../../util/userStorage'

const TambahAkun = () => {
  const [akun, setAkun] = useState({
    nama: '',
    email: '',
    password: '',
    noTelp: '',
    izin: 'karyawan',
  })

  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const { user } = userStorage()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    fetch('http://localhost:8000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify(akun),
    })
      .then(async (res) => {
        const data = await res.json()
        console.log(data)
        navigate('/admin/akun')
        setAkun({
          nama: '',
          email: '',
          password: '',
          noTelp: '',
          izin: 'karyawan',
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {akun.password !== password && (
          <p className='text-red-500 text-sm'>
            Password tidak sama, silahkan masukkan ulang password
          </p>
        )}

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

export default TambahAkun
