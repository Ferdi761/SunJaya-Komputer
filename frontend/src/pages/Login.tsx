import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../util/useStore'

const Login = () => {
  const { setUser } = useStore()
  const [akun, setAkun] = React.useState({ email: '', password: '' })

  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(akun),
    })
      .then(async (response) => {
        const data = await response.json()

        if (response.ok) {
          setUser(data.data)
        } else {
          alert(data.message)
        }
      })
      .catch((error) => {
        alert(error.message)
      })
      .finally(() => {
        setAkun({ email: '', password: '' })
        navigate('/')
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
            Email
          </label>
          <input
            className='focus:ring-2 focus:ring-black focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-primary rounded-md py-2 pl-5 ring-1 ring-slate-200 shadow-sm bg-formInput'
            type='email'
            id='email'
            aria-label='email'
            placeholder='Email'
            autoComplete='email'
            value={akun.email}
            onChange={(e) =>
              setAkun({ ...akun, email: e.target.value })
            }
          />
        </div>
        <div className='mb-6'>
          <label className='block text-black font-semibold text-lg mb-2'>
            Password
          </label>
          <input
            className='focus:ring-2 focus:ring-black focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-primary rounded-md py-2 pl-5 ring-1 ring-slate-200 shadow-sm bg-formInput'
            type='password'
            aria-label='password'
            placeholder='password'
            autoComplete='current-password'
            value={akun.password}
            onChange={(e) =>
              setAkun({ ...akun, password: e.target.value })
            }
          />
        </div>
        <div className='flex items-center justify-between'>
          <Link
            to='/register'
            className='bg-primary hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded transition-all duration-300 uppercase'
            type='submit'
          >
            register
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

export default Login
