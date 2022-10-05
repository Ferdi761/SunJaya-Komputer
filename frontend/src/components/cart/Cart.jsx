import React from 'react';
import { useState } from 'react';
import cpu from '../../img/produk/cpu-corei3.png';

const Cart = () => {
  const [jumlah, setJumlah] = useState(1);
  const sisa = 4;

  return (
    <>
      <div className='container my-3'>
        <p className='mt-3'>
          Menampilkan daftar barang dalam keranjang <br />
          Total barang: 4 jenis barang <br />
          Total Biaya: Rp 3.800.000
        </p>
        <div className='row'>
          <div className='col-7'>
            <div
              className='row mb-2 p-2 d-flex align-items-center'
              style={{
                backgroundColor: '#F9F9F9',
                boxShadow: 'rgba(0, 0, 0, 0.24) 5px 5px 6px',
              }}
            >
              <div className='col-3'>
                <img
                  src={cpu}
                  alt='cpu'
                  width='128px'
                  height='128px'
                />
              </div>
              <div className='col-5'>
                <p>Core I3-7100 3,9 Ghz - Socket 1151</p>
                <p>Rp 950.000/barang</p>
                <p>Total: Rp 950.000</p>
              </div>
              <div className='col-3'>
                <p>Jumlah</p>
                <div className='input-group'>
                  <span className='input-group-btn'>
                    <button
                      type='button'
                      className='btn btn-default btn-number'
                      data-type='minus'
                      disabled={jumlah === 1 ? 'disabled' : ''}
                      data-field='quant[1]'
                      onClick={() => setJumlah((prev) => prev - 1)}
                    >
                      <i className='bi bi-dash-circle-fill'></i>
                    </button>
                  </span>
                  <input
                    type='text'
                    name='quant[1]'
                    className='form-control input-number'
                    value={jumlah}
                    min='1'
                    max='10'
                  />
                  <span className='input-group-btn'>
                    <button
                      type='button'
                      className='btn btn-default btn-number'
                      data-type='plus'
                      disabled={jumlah >= sisa ? 'disabled' : ''}
                      data-field='quant[1]'
                      onClick={() => setJumlah((prev) => prev + 1)}
                    >
                      <i className='bi bi-plus-circle-fill'></i>
                    </button>
                  </span>
                </div>
                <p>Stok sisa: {sisa} buah</p>
              </div>
              <div className='col-1 '>
                <button className='btn btn-danger'>
                  <i className='bi bi-trash-fill'></i>
                </button>
              </div>
            </div>
          </div>
          <div className='col-4 ms-5'>
            <div
              className='p-3 text-white rounded'
              style={{ backgroundColor: '#262626' }}
            >
              <p>Rincian Keranjang</p>
              <ul className='list-group'>
                <li className='list-group-item d-flex justify-content-between align-items-start bg-transparent text-white p-0'>
                  <p>Total Barang</p>
                  <p>4 Barang</p>
                </li>
                <li className='list-group-item d-flex justify-content-between align-items-start bg-transparent text-white p-0'>
                  <p>Total Berat</p>
                  <p>1 Kg</p>
                </li>
                <li className='list-group-item d-flex justify-content-between align-items-start bg-transparent text-white p-0'>
                  <p>Total Belanja</p>
                  <p>Rp 3.800.000</p>
                </li>
              </ul>
              <div className='my-3'>
                <label
                  for='exampleFormControlTextarea1'
                  className='form-label text-white'
                >
                  Alamat
                </label>
                <textarea
                  className='form-control'
                  id='exampleFormControlTextarea1'
                  rows='3'
                  placeholder='*Tulis secara lengkap, kecamatan, kota, dan provinsi'
                ></textarea>
              </div>
              <button className='btn btn-primary col-12'>
                PESAN
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
