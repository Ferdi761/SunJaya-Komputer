import React from 'react'
import dataRekening from '../../data/dataRekening'

const Modal = () => {
  return (
    <div
      className='modal fade'
      id='pembayaran'
      data-bs-backdrop='static'
      data-bs-keyboard='false'
      tabIndex={-1}
      aria-labelledby='staticBackdropLabel'
      aria-hidden='true'>
      <div className='modal-dialog'>
        <div className='modal-content bg-secondary p-3'>
          <div className='text-center'>
            <h1
              className='fw-bold modal-title fs-5'
              id='staticBackdropLabel'>
              Daftar Nomor Rekening
            </h1>
            <p>
              Silahkan transfer pembayaran ke salah satu nomor
              rekening di bawah ini
            </p>
          </div>
          <div className='modal-body'>
            {dataRekening.map((rekening) => {
              return (
                <div
                  className='bg-white text-center rounded mb-2 py-3'
                  key={rekening.id}>
                  <p>
                    Bank: {rekening.nama} <br /> Nomor Rekening:{' '}
                    {rekening.nomor}
                  </p>
                </div>
              )
            })}
          </div>
          <div className='text-center'>
            <button
              type='button'
              className='btn btn-primary rounded-pill'
              data-bs-dismiss='modal'>
              Kembali
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
