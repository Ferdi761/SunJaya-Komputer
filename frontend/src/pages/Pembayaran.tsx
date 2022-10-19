import React from 'react'
import { Link } from 'react-router-dom'
import dataPesanan from '../data/dataProduk'
import Modal from '../components/Modal'

const Pembayaran = () => {
  const [modal, setModal] = React.useState(false)

  return (
    <>
      <div className='my-10 mx-20'>
        <div className='flex flex-row gap-10'>
          <div className='w-7/12'>
            {dataPesanan.map((data) => {
              return (
                <div
                  className='flex flex-row gap-5 mb-4 py-5 px-10 items-center rounded bg-light'
                  style={{
                    boxShadow: 'rgba(0, 0, 0, 0.24) 5px 5px 6px',
                  }}
                  key={data._id}>
                  <div className='w-3/12'>
                    <img
                      src={data.gambar}
                      alt='cpu'
                      width='128px'
                      height='128px'
                    />
                  </div>
                  <div className='w-9/12'>
                    <p className='font-bold'>{data.nama}</p>
                    <p>
                      Jumlah:{' '}
                      <span className='font-bold'>
                        {data.jumlah} buah
                      </span>
                    </p>
                    <div className='font-bold text-end'>
                      <p className='text-blue-500 font-bold'>
                        Total: {data.harga}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className='w-5/12'>
            <div className='p-10 text-white rounded bg-dark'>
              <h5 className='mb-5 text-3xl'>Rincian Pesanan</h5>
              <ul className=' mb-2'>
                <li className='text-gray-400'>ID Pesanan: #17</li>
                <li className='text-gray-400'>TOtal Berat: 10 Kg</li>
                <li className='text-gray-400'>
                  Alamat Tujuan:{' '}
                  <span className='text-white'>
                    Jalan Keputih Tegal Timur No. 2A, Keputih,
                    Sukolilo, Surabaya, Jawa Timur
                  </span>
                </li>
              </ul>
              <textarea className='h-36 w-full rounded-lg'></textarea>
              <ul className='my-3 flex flex-col gap-3'>
                <li className='flex justify-between items-start'>
                  <p>Subtotal Produk</p>
                  <p>Rp 3.400.000</p>
                </li>
                <li className='flex justify-between items-start'>
                  <p>Subtotal Pengiriman</p>
                  <p>Rp 20.000</p>
                </li>
                <li className='flex justify-between items-start'>
                  <p>Tipe</p>
                  <p>Pemesanan</p>
                </li>
                <li className='flex justify-between items-start text-xl font-semibold'>
                  <p>Total Pesanan</p>
                  <p>Rp 3.400.000</p>
                </li>
              </ul>
              <div className='flex flex-row justify-between'>
                <button className='border px-5 rounded-full hover:bg-white hover:text-black transition-all ease-in-out duration-300'>
                  Upload Pembayaran
                </button>
                <button
                  className='border px-5 rounded-full hover:bg-white hover:text-black transition-all ease-in-out duration-300'
                  onClick={() => setModal(true)}>
                  Daftar Rekening
                </button>
              </div>
              <Link to='/pesanan-saya'>
                <button className='rounded-full bg-blue-700 py-3 w-full mt-5 hover:bg-blue-900 transition-all ease-in-out duration-300'>
                  Simpan
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Modal modal={modal} setModal={setModal} />
    </>
  )
}

export default Pembayaran
