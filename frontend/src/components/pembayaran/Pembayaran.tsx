import React from 'react'
import { Link } from 'react-router-dom'
import dataPesanan from '../../data/dataProduk'
import Modal from './Modal'

const Pembayaran = () => {
  return (
    <div className='container my-5'>
      <div className='row'>
        <div className='col-7'>
          {dataPesanan.map((data) => {
            return (
              <div
                className='row mb-4 py-3 px-2 d-flex align-items-center rounded'
                style={{
                  backgroundColor: '#F9F9F9',
                  boxShadow: 'rgba(0, 0, 0, 0.24) 5px 5px 6px',
                }}
                key={data._id}>
                <div className='col-3'>
                  <img
                    src={data.gambar}
                    alt='cpu'
                    width='128px'
                    height='128px'
                  />
                </div>
                <div className='col-9'>
                  <p className='fw-bold'>{data.nama}</p>
                  <p>
                    Jumlah:{' '}
                    <span className='fw-bold'>
                      {data.jumlah} buah
                    </span>
                  </p>
                  <div className='fw-bold text-end'>
                    <p className='text-primary fw-bold'>
                      Total: {data.harga}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className='col-5'>
          <div
            className='p-3 text-white rounded pb-5'
            style={{ backgroundColor: '#262626' }}>
            <h5 className='mb-3'>Rincian Pesanan</h5>
            <ul className='list-group mb-2'>
              <li className='list-group-item bg-transparent text-white-50 p-0'>
                ID Pesanan: #17
              </li>
              <li className='list-group-item bg-transparent text-white-50 p-0'>
                TOtal Berat: 10 Kg
              </li>
              <li className='list-group-item bg-transparent text-white-50 p-0'>
                Alamat Tujuan:{' '}
                <span className='text-white'>
                  Jalan Keputih Tegal Timur No. 2A, Keputih, Sukolilo,
                  Surabaya, Jawa Timur
                </span>
              </li>
            </ul>
            <textarea
              className='form-control my-3'
              id='exampleFormControlTextarea1'
              rows={3}></textarea>
            <ul className='list-group'>
              <li className='list-group-item d-flex justify-content-between align-items-start bg-transparent text-white-50 p-0 border-0'>
                <p>Subtotal Produk</p>
                <p>Rp 3.400.000</p>
              </li>
              <li className='list-group-item d-flex justify-content-between align-items-start bg-transparent text-white-50 p-0 border-0'>
                <p>Subtotal Pengiriman</p>
                <p>Rp 20.000</p>
              </li>
              <li className='list-group-item d-flex justify-content-between align-items-start bg-transparent text-white-50 p-0 border-0'>
                <p>Tipe</p>
                <p>Pemesanan</p>
              </li>
              <li className='list-group-item d-flex justify-content-between align-items-start bg-transparent text-white p-0 border-0'>
                <p>Total Pesanan</p>
                <p>Rp 3.400.000</p>
              </li>
            </ul>
            <button className='btn btn-outline-light mb-2 float-start rounded-pill'>
              Upload Pembayaran
            </button>
            <button
              data-bs-toggle='modal'
              data-bs-target='#pembayaran'
              className='btn btn-outline-light mb-2 float-end rounded-pill'>
              Daftar Rekening
            </button>
            <Link to='/pesanan-saya'>
              <button className='btn btn-primary col-12 rounded-pill'>
                Simpan
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Modal />
    </div>
  )
}

export default Pembayaran
