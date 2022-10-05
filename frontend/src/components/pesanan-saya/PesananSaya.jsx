import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import dataPesanan from '../../data/dataProduk';
import RincianPesanan from './RincianPesanan';

const PesananSaya = () => {
  const statusPesanan = [
    {
      id: 1,
      status: 'Menunggu konfirmasi',
    },
    {
      id: 2,
      status: 'Bayar',
    },
    {
      id: 3,
      status: 'Diproses',
    },
    {
      id: 4,
      status: 'Dikirim',
    },
    {
      id: 5,
      status: 'Selesai',
    },
  ];

  const [value, setValue] = useState(1);

  const valueChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <div className='container-fluid bg-white'>
        <div className='container my-5'>
          <div className='row'>
            <div className='col-12'>
              <h1 style={{ fontSize: '28px' }}>
                <i className='bi bi-bag-fill'></i> Pesanan Saya
              </h1>
            </div>
            <div className='col-12'>
              <ul className='list-group list-group-horizontal'>
                <li
                  className={`pesanan list-group-item border-0 ${
                    statusPesanan[0].id === value ? 'fw-bold' : ''
                  }`}
                  value={1}
                  onClick={valueChange}
                >
                  Menunggu konfirmasi
                </li>
                <li
                  className={`pesanan list-group-item border-0 ${
                    statusPesanan[1].id === value ? 'fw-bold' : ''
                  }`}
                  value={2}
                  onClick={valueChange}
                >
                  Bayar
                </li>
                <li
                  className={`pesanan list-group-item border-0 ${
                    statusPesanan[2].id === value ? 'fw-bold' : ''
                  }`}
                  value={3}
                  onClick={valueChange}
                >
                  Diproses
                </li>
                <li
                  className={`pesanan list-group-item border-0 ${
                    statusPesanan[3].id === value ? 'fw-bold' : ''
                  }`}
                  value={4}
                  onClick={valueChange}
                >
                  Dikirim
                </li>
                <li
                  className={`pesanan list-group-item border-0 ${
                    statusPesanan[4].id === value ? 'fw-bold' : ''
                  }`}
                  value={5}
                  onClick={valueChange}
                >
                  Selesai
                </li>
              </ul>
            </div>
            <div className='col-6'>
              <div
                className='row mb-4 py-3 px-2 d-flex align-items-center rounded'
                style={{
                  backgroundColor: '#F9F9F9',
                  boxShadow: 'rgba(0, 0, 0, 0.24) 5px 5px 6px',
                }}
              >
                {dataPesanan.map((data) => {
                  return (
                    <div
                      className='mx-3 row border-top'
                      key={data._id}
                    >
                      <div className='col-3 py-2 mb-3'>
                        <img
                          src={data.gambar}
                          alt='cpu'
                          width='128px'
                          height='128px'
                        />
                      </div>
                      <div className='col-9 py-2 mb-3'>
                        <p className='fw-bold'>{data.nama}</p>
                        <p>
                          Jumlah:{' '}
                          <span className='fw-bold'>
                            {data.jumlah} buah
                          </span>
                        </p>
                        <p className='float-end text-primary fw-bold'>
                          Total: {data.harga}
                        </p>
                        <Link
                          to='/garansi'
                          className='fw-bold text-decoration-none'
                        >
                          Ajukan Garansi
                        </Link>
                      </div>
                    </div>
                  );
                })}
                <ul className='list-group border-top p-2 border-bottom'>
                  {statusPesanan[4].id === value ? (
                    ''
                  ) : (
                    <li className='list-group-item d-flex justify-content-between align-items-start p-0 bg-transparent border-0'>
                      <p>Tipe</p>
                      <p>Pemesanan</p>
                    </li>
                  )}
                  <li className='list-group-item d-flex justify-content-between align-items-start p-0 bg-transparent border-0'>
                    <p>Total Pesanan</p>
                    <p>
                      {statusPesanan[0].id === value
                        ? 'Rp 3.400.000'
                        : 'Rp 3.420.000'}
                    </p>
                  </li>
                </ul>
              </div>

              {statusPesanan[4].id === value ? (
                ''
              ) : (
                <div
                  className='row mb-2 py-3 px-2 d-flex align-items-center rounded'
                  style={{
                    backgroundColor: '#F9F9F9',
                    boxShadow: 'rgba(0, 0, 0, 0.24) 5px 5px 6px',
                  }}
                >
                  <div className='row border-top'>
                    <div className='col-3 py-2 mb-3'>
                      <img
                        src={dataPesanan[0].gambar}
                        alt='cpu'
                        width='128px'
                        height='128px'
                      />
                    </div>
                    <div className='col-9 py-2 mb-3'>
                      <p className='fw-bold'>{dataPesanan[0].nama}</p>
                      <p>
                        Jumlah:{' '}
                        <span className='fw-bold'>
                          {dataPesanan[0].jumlah} buah
                        </span>
                      </p>
                      <p className='float-end text-primary fw-bold'>
                        Total: Rp 0
                      </p>
                    </div>
                  </div>
                  <ul className='list-group border-top p-2 border-bottom'>
                    <li className='list-group-item d-flex justify-content-between align-items-start p-0 bg-transparent border-0'>
                      <p>Tipe</p>
                      <p>Garansi</p>
                    </li>
                    <li className='list-group-item d-flex justify-content-between align-items-start p-0 bg-transparent border-0'>
                      <p>Total Pesanan</p>
                      <p>Rp 0</p>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div className='col-4 ms-5'>
              <RincianPesanan
                dataPesanan={dataPesanan}
                value={value}
                statusPesanan={statusPesanan}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PesananSaya;
