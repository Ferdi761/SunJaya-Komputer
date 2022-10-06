import caseImage from '../../img/case.png'
import hdd from '../../img/hdd.png'
import monitor from '../../img/monitor.png'
import casing from '../../img/casing.png'
import Card from './Card'
import Category from './Category'
import ProductsForYou from './ProductsForYou'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <section
        className='container-fluid text-white py-5'
        style={{ minHeight: '120vh', backgroundColor: '#0E0E0E' }}>
        <div className='row ms-5'>
          <div className='col-6' style={{ marginTop: '7rem' }}>
            <h1 style={{ fontSize: '70px', marginBottom: '1rem' }}>
              Sun Jaya Komputer
            </h1>
            <h4 style={{ fontSize: '36px', marginBottom: '2rem' }}>
              Menyediakan berbagai perangkat <br /> komputer - murah -
              dengan <br /> kualitas terjamin.
            </h4>
            <p
              style={{
                fontSize: '16px',
                opacity: '75%',
                marginBottom: '1.5rem',
              }}>
              Dapatkan seluruh perangkat komputer yang anda butuhkan
              untuk menunjang seluruh aktifitas keseharian anda. siap
              untuk kami kirim.
            </p>
            <div className='row'>
              <div className='col-4'>
                <button
                  className='btn btn-primary p-3'
                  style={{ fontSize: '18px' }}>
                  Produk Terlaris
                </button>
              </div>
              <div className='col-6'>
                <div className='dropdown'>
                  <button
                    className='btn btn-secondary dropdown-toggle p-3'
                    type='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                    style={{ fontSize: '18px' }}>
                    Hubungi Kami
                  </button>
                  <ul className='dropdown-menu'>
                    <li>
                      <Link className='dropdown-item' to='/chat'>
                        Via Website
                      </Link>
                    </li>
                    <li>
                      <a className='dropdown-item' href='/'>
                        Via Whatsapp
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className='col-6' style={{ marginTop: '-3rem' }}>
            <div
              className='card mb-3'
              style={{
                maxWidth: '540px',
                backgroundColor: '#0E0E0E',
                float: 'right',
              }}>
              <div className='row g-0'>
                <div className='col-8'>
                  <div className='card-body'>
                    <h5 className='card-title'>Seluruh Indonesia</h5>
                    <p className='card-text'>
                      Dengan seluruh pelayanan yang kami berikan
                      membuat perangkat kami terjual ke seluruh
                      Indonesia
                    </p>
                  </div>
                </div>
                <div className='col-4'>
                  <img src={hdd} className='img-fluid' alt='...' />
                </div>
              </div>
            </div>
            <div
              className='card mb-3'
              style={{
                maxWidth: '540px',
                float: 'left',
              }}>
              <div className='row g-0'>
                <div className='col-8'>
                  <div className='card-body text-dark'>
                    <h5 className='card-title'>Kualitas Terjamin</h5>
                    <p className='card-text'>
                      Seluruh perangkat yang kami sediakan telah
                      melebati berbagai macam pengecekan agar
                      perangkat yang sampai kepada Anda memiliki
                      kualitas yang terjamin
                    </p>
                  </div>
                </div>
                <div className='col-4'>
                  <img
                    src={caseImage}
                    className='img-fluid'
                    alt='...'
                  />
                </div>
              </div>
            </div>
            <div
              className='card mb-3'
              style={{
                maxWidth: '540px',
                float: 'right',
                backgroundColor: '#E5E5E5',
              }}>
              <div className='row g-0'>
                <div className='col-4'>
                  <img
                    src={monitor}
                    className='img-fluid'
                    alt='...'
                  />
                </div>
                <div className='col-8'>
                  <div className='card-body text-dark'>
                    <h5 className='card-title'>Harga Termurah</h5>
                    <p className='card-text'>
                      Harga yang kami tawarkan merupakan harga
                      termurah untuk perangkat dengan kualitas terbaik
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className='card mb-3'
              style={{
                maxWidth: '640px',
                float: 'left',
                backgroundColor: '#0E0E0E',
              }}>
              <div className='row g-0'>
                <div className='col-8'>
                  <div className='card-body text-white'>
                    <h5 className='card-title'>Second Bermutu</h5>
                    <p className='card-text'>
                      Perangkat yang kami terima dari pemilik
                      sebelumnya hanyalah perangkat yang memiliki
                      kualitas yang masih terjaga sehingga pelanggan
                      tidak perlu mengkhawatirkan apapun
                    </p>
                  </div>
                </div>
                <div className='col-4'>
                  <img src={casing} className='img-fluid' alt='...' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Card />
      <Category />
      <ProductsForYou />
    </>
  )
}

export default Home
