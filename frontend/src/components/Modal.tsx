import { Transition, Dialog } from '@headlessui/react'
import React, { Fragment } from 'react'
import dataRekening from '../data/dataRekening'

interface ModalProps {
  modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal: React.FC<ModalProps> = (props: ModalProps) => (
  <Transition appear show={props.modal} as={Fragment}>
    <Dialog
      as='div'
      className='relative z-10'
      onClose={() => props.setModal(false)}>
      <Transition.Child
        as={Fragment}
        enter='ease-out duration-300'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='ease-in duration-200'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'>
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
            leaveTo='opacity-0 scale-95'>
            <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
              <Dialog.Title
                as='h3'
                className='text-lg font-medium leading-6 text-gray-900 text-center'>
                Daftar Nomor Rekening
              </Dialog.Title>
              <div className='mt-2'>
                <p className='text-sm text-gray-500 text-center'>
                  Silahkan transfer ke salah satu nomor rekening di
                  bawah ini
                </p>
              </div>
              <Dialog.Description className='mt-4'>
                <div className='flex flex-col justify-center items-center'>
                  {dataRekening.map((rekening) => {
                    return (
                      <ul
                        className='bg-white w-11/12 text-center rounded-lg mb-2 py-3 px-10'
                        key={rekening.id}>
                        <li>
                          Bank:{' '}
                          <span className='font-semibold'>
                            {rekening.nama}{' '}
                          </span>
                        </li>
                        <li>
                          Nomor Rekening:{' '}
                          <span className='font-semibold'>
                            {rekening.nomor}
                          </span>
                        </li>
                        <li>
                          Atas Nama:{' '}
                          <span className='font-semibold'>
                            {rekening.pemilik}
                          </span>
                        </li>
                      </ul>
                    )
                  })}
                </div>
              </Dialog.Description>

              <div className='mt-4 text-center'>
                <button
                  type='button'
                  className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                  onClick={() => props.setModal(false)}>
                  Kembali
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
)

export default Modal
