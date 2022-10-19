import { Listbox, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { IoIosArrowDown } from 'react-icons/io'

const TambahAkun = () => {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div className='flex justify-center my-20'>
      <form
        className='flex flex-col justify-center w-1/3'
        onSubmit={handleSubmit}>
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
            <span className='absolute left-3 top-1/2 -mt-3 text-slate-400 pointer-events-none group-focus-within:text-black'>
              +62
            </span>
            <input
              className='focus:ring-2 focus:ring-black focus:outline-none appearance-none w-full text-md leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-12 ring-1 ring-slate-200 shadow-sm'
              type='number'
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
                              selected ? 'font-medium' : 'font-normal'
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
  )
}

export default TambahAkun
