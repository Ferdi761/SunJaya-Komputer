import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const [akun, setAkun] = React.useState({
    nama: '',
    email: '',
    password: '',
    izin: 'user',
    noTelp: '',
  })

  const [password, setPassword] = React.useState('')

  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    fetch('http://localhost:8000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(akun),
    })
      .then(async (response) => {
        const data = await response.json()

        if (response.ok) {
          alert(data.message)
          navigate('/login')
        } else {
          alert(data.message)
        }
      })
      .catch((error) => {
        alert(error.message)
      })
      .finally(() => {
        setAkun({
          nama: '',
          email: '',
          password: '',
          izin: 'user',
          noTelp: '',
        })
        setPassword('')
      })
  }

  return (
    <div className='flex justify-center items-center h-screen bg-primary'>
      <form
        className='bg-form rounded-lg w-1/2 p-10'
        onSubmit={handleSubmit}
      >
        <h1 className='mb-4 text-3xl text-white uppercase font-bold'>
          login account
        </h1>
        <div className='mb-4'>
          <label className='block text-black font-semibold text-lg mb-2'>
            Nama
          </label>
          <input
            className='focus:ring-2 focus:ring-black focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-primary rounded-md py-2 pl-5 ring-1 ring-slate-200 shadow-sm bg-formInput'
            type='text'
            aria-label='nama'
            placeholder='nama'
            value={akun.nama}
            onChange={(e) =>
              setAkun({ ...akun, nama: e.target.value })
            }
          />
        </div>
        <div className='mb-4'>
          <label className='block text-black font-semibold text-lg mb-2'>
            Email
          </label>
          <input
            className='focus:ring-2 focus:ring-black focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-primary rounded-md py-2 pl-5 ring-1 ring-slate-200 shadow-sm bg-formInput'
            type='text'
            autoComplete='email'
            aria-label='email'
            placeholder='email'
            value={akun.email}
            onChange={(e) =>
              setAkun({ ...akun, email: e.target.value })
            }
          />
        </div>

        <div className='mb-4'>
          <label className='block text-black font-semibold text-lg mb-2'>
            Password
          </label>
          <input
            className='focus:ring-2 focus:ring-black focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-primary rounded-md py-2 pl-5 ring-1 ring-slate-200 shadow-sm bg-formInput'
            type='password'
            autoComplete='new-password'
            aria-label='password'
            placeholder='password'
            value={akun.password}
            onChange={(e) =>
              setAkun({ ...akun, password: e.target.value })
            }
          />
        </div>

        <div className='mb-4'>
          <label className='block text-black font-semibold text-lg mb-2'>
            Masukkan Ulang Password
          </label>
          <input
            className='focus:ring-2 focus:ring-black focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-primary rounded-md py-2 pl-5 ring-1 ring-slate-200 shadow-sm bg-formInput'
            type='password'
            autoComplete='new-password'
            aria-label='password'
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <label className='text-red-700 font-bold text-sm my-2 flex flex-row gap-2 items-center'>
            <RiErrorWarningFill /> Password tidak sama
          </label> */}
        </div>

        <div className='mb-4 group'>
          <label className='block text-black font-semibold text-lg mb-2'>
            No Telp
          </label>
          <input
            className='focus:ring-2 focus:ring-black focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-primary rounded-md py-2 pl-5 ring-1 ring-slate-200 shadow-sm bg-formInput'
            type='number'
            aria-label='no telp'
            placeholder='+62'
            value={akun.noTelp}
            onChange={(e) =>
              setAkun({ ...akun, noTelp: e.target.value })
            }
          />
        </div>

        <div className='flex items-center justify-between'>
          <Link
            to='/login'
            className=' text-white font-bold py-2 px-4 rounded uppercase bg-primary hover:bg-white hover:text-black transition-all duration-300'
          >
            login
          </Link>
          <div className='flex flex-row gap-5'>
            <button
              className='bg-primary hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded transition-all duration-300'
              type='submit'
            >
              Reset
            </button>
            <button
              className='bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded transition-all duration-300'
              type='submit'
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Register
