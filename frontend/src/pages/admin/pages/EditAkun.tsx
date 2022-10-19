import { Listbox, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { IoIosArrowDown } from 'react-icons/io'

const EditAkun = () => {
  const izin = [
    { name: 'Karyawan' },
    { name: 'Admin' },
    { name: 'Operator' },
  ]

  const [selected, setSelected] = React.useState(izin[0])

  const [akun, setAkun] = React.useState({
    nama: '',
    email: '',
    password: '',
    noTelp: '',
    alamat: '',
    jenis: '',
    izin: selected.name,
  })

  React.useEffect(() => {
    setAkun({
      nama: 'Shin Ryujin',
      email: 'admin@sunjaya.com',
      password: '',
      noTelp: '081234567890',
      alamat: 'Jl. Sunjaya No. 1',
      jenis: 'Admin',
      izin: 'Karyawan',
    })
  }, [])

  return (
    <div className='my-10 mx-32'>
      <h1 className='uppercase font-bold text-2xl text-center mb-5'>
        Edit Akun Karyawan
      </h1>
      <div className='flex flex-row gap-10'>
        <div className='w-1/2 bg-darkGrey border border-gray-900 rounded-2xl py-5 px-10'>
          <h3 className='uppercase font-bold text-xl text-center mb-5'>
            data akun
          </h3>
          <div className='flex flex-row'>
            <ul className='w-1/5 font-semibold'>
              <li>ID</li>
              <li>Nama</li>
              <li>Email</li>
              <li>Izin</li>
              <li>No Telp</li>
            </ul>
            <ul>
              <li>: #17</li>
              <li>: Shin Ryujin</li>
              <li>: admin@sunjaya.com</li>
              <li>: Admin</li>
              <li>: +628123456789</li>
            </ul>
          </div>
        </div>
        <form className='flex flex-col justify-center w-1/2 bg-darkGrey border border-gray-900 rounded-2xl py-5 px-10'>
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
            <input
              className='focus:ring-2 focus:ring-black focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-5 ring-1 ring-slate-200 shadow-sm'
              type='text'
              aria-label='Nama'
              placeholder='Nama'
              value={akun.noTelp}
              onChange={(e) =>
                setAkun({ ...akun, noTelp: e.target.value })
              }
            />
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
            <Listbox value={selected} onChange={setSelected}>
              <div className='relative mt-1'>
                <Listbox.Button className='relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm border'>
                  <span className='block truncate'>
                    {selected.name}
                  </span>
                  <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                    <IoIosArrowDown />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave='transition ease-in duration-100'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'>
                  <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                    {izin.map((person, personIdx) => (
                      <Listbox.Option
                        key={personIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? 'bg-amber-100 text-amber-900'
                              : 'text-gray-900'
                          }`
                        }
                        value={person}>
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected
                                  ? 'font-medium'
                                  : 'font-normal'
                              }`}>
                              {person.name}
                            </span>
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>

          <div className='flex justify-center'>
            <button
              className='bg-teal-700 text-white rounded-xl font-bold text-lg px-10 hover:bg-teal-900'
              type='submit'>
              SIMPAN
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditAkun
