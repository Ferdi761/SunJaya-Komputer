import { useEffect, useState } from 'react'
import { HiPencil, HiTrash } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { useStore } from '../../../util/userStorage'

const Akun = () => {
  const [akun, setAkun] = useState([
    {
      id: 0,
      nama: '',
      email: '',
      passwordHashed: '',
      izin: '',
      noTelp: '',
      alamat: '',
    },
  ])

  const [loading, setLoading] = useState(true)

  const [q, setQ] = useState('')
  const [searchParam] = useState(['nama', 'email', 'noTelp'])

  const { user } = useStore()

  const search = (rows: any) => {
    return rows.filter((row: any) =>
      searchParam.some((newItem: any) => {
        return (
          row[newItem]
            .toString()
            .toLowerCase()
            .indexOf(q.toLowerCase()) > -1
        )
      })
    )
  }

  useEffect(() => {
    fetch('http://localhost:8000/api/akun/karyawan', {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json()
        setAkun(data.data)
      })
      .catch((err) => console.log(err))
  }, [loading])

  const handleDelete = (id: number) => {
    fetch(`http://localhost:8000/api/akun/karyawan/${id}`, {
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
    <div className='flex justify-center mt-16'>
      <div className='w-2/3'>
        <h1 className='font-bold text-2xl uppercase'>
          daftar karyawan
        </h1>
        <div className='flex flex-row justify-between'>
          <form className='group relative w-1/4 my-5'>
            <input
              className='focus:ring-2 focus:ring-black focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-3 ring-1 ring-slate-200 shadow-sm'
              type='text'
              aria-label='Cari Akun'
              placeholder='Cari Karyawan'
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
            to='/admin/tambah-akun'
            className='text-blue-600 hover:text-blue-800 font-semibold underline underline-offset-4'
          >
            Tambah Akun
          </Link>
        </div>

        <div className='flex flex-col gap-10'>
          {search(akun).map((item: any) => (
            <div
              className='bg-light flex justify-center items-center'
              key={item.id}
            >
              <div className='w-3/4 my-5'>
                <div className='grid grid-cols-2 gap-5 w-fit'>
                  <h3 className='font-semibold text-lg'>
                    {item.nama}
                  </h3>
                  <p></p>
                  <p>
                    ID:{' '}
                    <span className='font-semibold'>#{item.id}</span>
                  </p>
                  <p>
                    Password:{' '}
                    <span className='font-semibold'>
                      {item.passwordHashed}
                    </span>
                  </p>
                  <p>
                    Email:{' '}
                    <span className='font-semibold'>
                      {item.email}
                    </span>
                  </p>
                  <p>
                    No. Telp:{' '}
                    <span className='font-semibold'>
                      {item.noTelp}
                    </span>
                  </p>
                  <div className='flex flex-row gap-10 justify-center items-center mt-5'>
                    <Link
                      to={`/admin/edit-akun/${item.id}`}
                      className='text-blue-700 flex flex-row gap-2 text-lg'
                    >
                      <HiPencil className='w-6 h-6' /> edit
                    </Link>
                    <button
                      className='bg-pink-500 hover:bg-pink-600 rounded-lg p-2'
                      onClick={() => handleDelete(item.id)}
                    >
                      <HiTrash className='text-white w-6 h-6' />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Akun
