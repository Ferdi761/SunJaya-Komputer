import { HiPencil, HiTrash } from 'react-icons/hi'
import { BsPlusCircleFill } from 'react-icons/bs'
import ModalRekening from '../components/ModalRekening'
import { useEffect, useState } from 'react'
import { userStorage } from '../../../util/userStorage'

const Rekening = () => {
  const [bank, setBank] = useState([
    {
      id: 0,
      namaBank: '',
      nomorRekening: '',
      atasNama: '',
    },
  ])
  const [tambah, setTambah] = useState({
    namaBank: '',
    nomorRekening: '',
    atasNama: '',
  })
  const [modal, setModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [mode, setMode] = useState('tambah')
  const [id, setId] = useState(0)

  const [q, setQ] = useState('')
  const [searchParam] = useState([
    'namaBank',
    'nomorRekening',
    'atasNama',
  ])

  const search = (rows: any) => {
    return rows.filter((row: any) =>
      searchParam.some(
        (newItem) =>
          row[newItem].toString().toLowerCase().indexOf(q) > -1
      )
    )
  }
  const { user } = userStorage()
  useEffect(() => {
    fetch('http://localhost:8000/api/rekening')
      .then(async (res) => {
        const data = await res.json()
        setBank(data)
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [loading])

  const deleteJenis = (id: number) => {
    fetch(`http://localhost:8000/api/rekening/hapus/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json()
        console.log(data)
        setLoading(!loading)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className='flex justify-center'>
      <div className='w-1/3 my-10'>
        <h1 className='font-bold text-2xl uppercase'>
          daftar rekening
        </h1>
        <form className='group relative w-1/2 my-5'>
          <input
            className='focus:ring-2 focus:ring-black focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-3 ring-1 ring-slate-200 shadow-sm'
            type='text'
            aria-label='Cari Rekening'
            placeholder='Cari Rekening'
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

        <div className='flex flex-col gap-10'>
          {search(bank).map((item: any) => (
            <div
              className='bg-light flex flex-row gap-10 p-5 rounded-lg shadow-xl'
              key={item.id}
            >
              <div className='flex flex-col w-full'>
                <h3 className='flex justify-center'>
                  ID :{' '}
                  <span className='font-semibold'>#{item.id}</span>
                </h3>
                <div className='flex flex-row justify-between'>
                  <p className='text-xl'>Bank</p>
                  <p className='text-xl font-bold'>{item.namaBank}</p>
                </div>
                <div className='flex flex-row justify-between'>
                  <p className='text-xl'>Nomor Rekening</p>
                  <p className='text-xl font-bold'>
                    {item.nomorRekening}
                  </p>
                </div>
                <div className='flex flex-row justify-between'>
                  <p className='text-xl'>Atas Nama</p>
                  <p className='text-xl font-bold'>{item.atasNama}</p>
                </div>
                <div className='flex flex-row gap-10 justify-center mt-5'>
                  <button
                    className='text-blue-700 flex flex-row gap-2 text-lg mt-2'
                    onClick={() => {
                      setTambah({
                        namaBank: item.namaBank,
                        nomorRekening: item.nomorRekening,
                        atasNama: item.atasNama,
                      })
                      setId(item.id)
                      setMode('edit')
                      setModal(true)
                    }}
                  >
                    <HiPencil className='w-6 h-6' /> edit
                  </button>
                  <button
                    className='bg-pink-500 hover:bg-pink-600 rounded-lg p-2'
                    onClick={() => deleteJenis(item.id)}
                  >
                    <HiTrash className='text-white w-6 h-6' />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button
            className='bg-light flex flex-row gap-10 p-5 rounded-lg shadow-xl justify-center uppercase font-bold'
            onClick={() => {
              setTambah({
                namaBank: '',
                nomorRekening: '',
                atasNama: '',
              })
              setMode('tambah')
              setModal(true)
            }}
          >
            <BsPlusCircleFill className='w-6 h-6 -mr-7' />
            tambah baru
          </button>

          <ModalRekening
            modal={modal}
            setModal={setModal}
            tambah={tambah}
            setTambah={setTambah}
            loading={loading}
            setLoading={setLoading}
            mode={mode}
            setMode={setMode}
            id={id}
            setId={setId}
          />
        </div>
      </div>
    </div>
  )
}

export default Rekening
