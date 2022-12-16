import { Transition, Dialog } from '@headlessui/react'
import { FormEvent, Fragment } from 'react'
import { userStorage } from '../../../util/userStorage'

interface ModalProps {
  modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  tambah: string
  setTambah: React.Dispatch<React.SetStateAction<string>>
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  mode: string
  setMode: React.Dispatch<React.SetStateAction<string>>
  id: number
  setId: React.Dispatch<React.SetStateAction<number>>
}

const ModalJenis: React.FC<ModalProps> = (props: ModalProps) => {
  const { user } = userStorage()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (props.mode === 'tambah') {
      fetch('http://localhost:8000/api/jenis/tambah', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user?.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nama: props.tambah,
        }),
      })
        .then(async (res) => {
          const data = await res.json()
          console.log(data)
          props.setTambah('')
          props.setLoading(!props.loading)
          props.setModal(false)
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (props.mode === 'edit') {
      fetch(`http://localhost:8000/api/jenis/${props.id}/edit`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${user?.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nama: props.tambah,
        }),
      })
        .then(async (res) => {
          const data = await res.json()
          console.log(data)
          props.setLoading(!props.loading)
          props.setModal(false)
          props.setMode('tambah')
          props.setTambah('')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  return (
    <Transition appear show={props.modal} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        onClose={() => props.setModal(false)}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 text-gray-900 text-center'
                >
                  Tambah Jenis Barang
                </Dialog.Title>
                <form
                  className='flex flex-col justify-center items-center mt-4'
                  onSubmit={handleSubmit}
                >
                  <input
                    className='focus:ring-2 focus:ring-black focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-primary rounded-md py-2 pl-5 ring-1 ring-slate-200 shadow-sm bg-formInput'
                    type='text'
                    aria-label='jenis'
                    placeholder='Jenis Barang'
                    value={props.tambah}
                    onChange={(e) =>
                      props.setTambah(e.currentTarget.value)
                    }
                  />
                  <div className='mt-4 flex justify-center gap-2'>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      onClick={() => {
                        if (props.mode === 'edit') {
                          props.setMode('tambah')
                          props.setTambah('')
                          props.setModal(false)
                        } else {
                          props.setModal(false)
                        }
                      }}
                    >
                      Kembali
                    </button>
                    <button
                      type='submit'
                      className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default ModalJenis
