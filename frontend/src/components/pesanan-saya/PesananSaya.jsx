import React from 'react';
import Navbar from '../navbar/Navbar';
import './PesananSaya.css';

const PesananSaya = () => {
  return (
    <>
      <Navbar />
      <div className='container-fluid bg-white'>
        <div className='container my-5'>
          <div className='row'>
            <div className='col-12'>
              <h1 style={{ fontSize: '28px' }}>
                <i className='bi bi-bag-fill'></i> Pesanan Saya
              </h1>
            </div>
            <div className='col-12'>
              <nav className='navbar navbar-expand-lg bg-white'>
                <div className='container-fluid'>
                  <div className='collapse navbar-collapse'>
                    <ul className='navbar-nav'>
                      <p className='navbar-brand status-pesanan py-2'>
                        Menunggu konfirmasi
                      </p>
                      <li className='nav-item'>
                        <p className='p-2 status-pesanan'>Bayar</p>
                      </li>
                      <li className='nav-item'>
                        <p className='p-2 status-pesanan'>Diproses</p>
                      </li>
                      <li className='nav-item'>
                        <p className='p-2 status-pesanan'>Dikirim</p>
                      </li>
                      <li className='nav-item'>
                        <p className='p-2 status-pesanan'>Selesai</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
            <div className='col-6'></div>
            <div className='col-6'></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PesananSaya;
