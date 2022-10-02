import React from 'react';

const Footer = () => {
  return (
    <footer className='container-fluid bg-black text-white py-3'>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <h1>Sun Jaya Komputer</h1>
          </div>
          <div className='col-4'>
            <p>Alamat</p>
            <div className='row' style={{ marginTop: '-9px' }}>
              <div className='col-1'>
                <i className='bi bi-geo-alt'></i>
              </div>
              <div className='col-10'>
                <p>
                  Jl. Mojo Kidul II No.D2, Mojo, Kec. Gubeng, Kota
                  SBY, Jawa Timur 60285
                </p>
              </div>
            </div>
          </div>
          <div className='col-4'>
            <p>Jam Operasional Kantor</p>
            <div className='row'>
              <div className='col-1'>
                <i className='bi bi-clock'></i>
              </div>
              <div className='col-10'>
                <p>09:00 - 20:00 WIB</p>
              </div>
            </div>
          </div>
          <div className='col-4'>
            <p>Hubungi kami jika ada pertanyaan</p>
            <div className='row'>
              <div className='col-1'>
                <i className='bi bi-whatsapp'></i>
              </div>
              <div className='col-10'>
                <p>+628123270165</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
