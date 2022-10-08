import { useState } from 'react'
import storeItems from '../../data/items.json'
import { formatDate } from '../../util/formatDate'

const FormGaransi = () => {
  const date = new Date()
  const [jumlah, setJumlah] = useState(1)
  const sisa = 4

  return (
    <div className='container my-5'>
      <div className='row'>
        <div className='col-6'>
          <div className='card w-100 d-flex align-items-center justify-content-center p-5'>
            <img
              src={storeItems[0].imgUrl}
              className='card-img-top'
              alt={storeItems[0].name}
              style={{ height: '15rem', width: '15rem' }}
            />
            <div className='card-body'>
              <h5 className='card-title text-center fw-bold'>
                {storeItems[0].name}
              </h5>
              <p className='card-text'>
                Tanggal Pembelian:{' '}
                <span className='fw-bold'>12 Mei 2022</span>
              </p>
              <p className='card-text'>
                Jumlah: <span className='fw-bold'>1 buah</span>
              </p>
              <ul className='list-group mb-2'>
                <li className='list-group-item bg-transparent p-0 border-0'>
                  ID Pemesanan: #17
                </li>
                <li className='list-group-item bg-transparent p-0 border-0'>
                  Waktu Pemesanan: {formatDate(date)}
                </li>
                <li className='list-group-item bg-transparent p-0 border-0'>
                  Waktu Pengiriman: {formatDate(date)}
                </li>
                <li className='list-group-item bg-transparent p-0 border-0'>
                  Waktu Sampai: {formatDate(date)}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='col-6'>
          <div
            className='card text-white'
            style={{ backgroundColor: '#262626' }}>
            <div className='card-body'>
              <h5 className='card-title fw-bold'>
                {storeItems[0].name}
              </h5>
              <div className='my-3'>
                <label
                  htmlFor='exampleFormControlTextarea1'
                  className='form-label text-white'>
                  Keluhan
                </label>
                <textarea
                  className='form-control'
                  id='exampleFormControlTextarea1'
                  rows={3}
                  placeholder='Tulis keluhan yang Anda alami disini'></textarea>
              </div>
              <div className='my-3 d-flex justify-content-between align-items-baseline'>
                <p className='card-text'>
                  Upload Bukti Kerusakan (OPTIONAL)
                </p>
                <button className='btn-outline-dark'>
                  Upload File
                </button>
                <p className='text-muted'>-File kosong-</p>
              </div>
              <div className='my-3'>
                <label
                  htmlFor='exampleFormControl'
                  className='form-label text-white'>
                  Alamat Tujuan Pengembalian
                </label>
                <input
                  type='email'
                  className='form-control'
                  id='exampleFormControlInput1'
                  placeholder='Tulis alamat Anda disini'
                />
              </div>
              <div className='my-3 w-25'>
                <p>Jumlah</p>
                <div className='input-group'>
                  <span className='input-group-btn'>
                    <button
                      type='button'
                      className='btn btn-outline-light btn-number rounded-0'
                      data-type='minus'
                      disabled={jumlah === 1 && true}
                      data-field='quant[1]'
                      onClick={() => setJumlah((prev) => prev - 1)}>
                      <i className='bi bi-dash-circle-fill'></i>
                    </button>
                  </span>
                  <input
                    type='text'
                    name='quant[1]'
                    className='form-control input-number'
                    value={jumlah}
                    readOnly
                    min='1'
                    max='10'
                  />
                  <span className='input-group-btn'>
                    <button
                      type='button'
                      className='btn btn-outline-light btn-number rounded-0'
                      data-type='plus'
                      disabled={jumlah >= sisa && true}
                      data-field='quant[1]'
                      onClick={() => setJumlah((prev) => prev + 1)}>
                      <i className='bi bi-plus-circle-fill'></i>
                    </button>
                  </span>
                </div>
                <p>Dari: {sisa} buah</p>
              </div>
              <p className='card-text'>
                <span className='text-muted'>
                  * Silahkan kirim barang kembali untuk kami periksa
                  dan perbaiki. <br /> Alamat:
                </span>{' '}
                Jl. Mojo Kidul II No.D2, Mojo, Kec. Gubeng, Kota
                Surabaya, Jawa Timur 60285
              </p>
              <div className='text-center'>
                <button className='btn btn-primary rounded-pill btn-lg'>
                  AJUKAN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormGaransi
