import React from 'react';
import cpu from '../../img/produk/cpu-corei3.png';

const DetailProduk = () => {
  return (
    <>
      <div className='container m-5 px-5'>
        <div className='row'>
          <div className='col-8'>
            <div
              className='card'
              style={{ width: '50rem', height: '25rem' }}
            >
              <div className='text-center bg-black rounded-top'>
                <img src={cpu} alt='cpu' style={{ width: '15rem' }} />
              </div>
              <div className='card-body'>
                <h5 className='card-title fw-bold border-bottom py-2'>
                  Deskripsi
                </h5>
                <p className='card-text'>
                  Core i3-71-- 3.9 GHz - Socket 1151 <br />
                  Garansi 1 minggu
                </p>
              </div>
            </div>
          </div>
          <div className='col-4'>
            <div className='card'>
              <div className='card-body'>
                <h5 className='card-title'>Rp 950.000</h5>
                <p className='card-text'>
                  Core i3-7100 3.9 GHz - Socket 1151 <br />
                  Stok sisa: 4 buah <br />
                  Berat: 200 gram
                </p>
                <div className='text-center'>
                  <button className='btn btn-primary rounded-pill'>
                    Masukkan keranjang
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProduk;
