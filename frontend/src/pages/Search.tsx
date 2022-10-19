import React from 'react'
import { Link } from 'react-router-dom'

const Search = () => {
  const [error, setError] = React.useState(null)
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [items, setItems] = React.useState([])

  const [q, setQ] = React.useState('')
  const [searchParam] = React.useState(['title', 'body'])

  // const search = (posts) => {
  //   return posts.filter((post) => {
  //     return searchParam.some((newPost) => {
  //       return (
  //         post[newPost]
  //           .toString()
  //           .toLowerCase()
  //           .indexOf(q.toLowerCase()) > -1
  //       )
  //     })
  //   })
  // }

  // if (error) return <div>Error: </div>
  // else if (!isLoaded) return <div>Loading...</div>
  // else {
  return (
    <div className='container my-5'>
      <p>
        Menampilkan hasil pencarian: "
        <span className='fw-bold'>Processor</span>"
      </p>
      <p>
        Hasil pencarian: <span className='fw-bold'>3 buah</span>
      </p>
      <div className='row mb-5'>
        <div className='col-8-custom'>
          <Link
            to='/aksesoris'
            className='text-decoration-none text-black'>
            <div className='text-center category-card'>
              <img
                src='img/kategori/aksesoris.png'
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Aksesoris Komputer & Laptop
              </p>
            </div>
          </Link>
        </div>
        <div className='col-8-custom'>
          <div className='text-center category-card'>
            <Link
              to='/aksesoris'
              className='text-decoration-none text-black'>
              <img
                src='img/kategori/kabel.png'
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Kabel & <br /> Adaptor
              </p>
            </Link>
          </div>
        </div>
        <div className='col-8-custom'>
          <div className='text-center category-card'>
            <Link
              to='/aksesoris'
              className='text-decoration-none text-black'>
              <img
                src='img/kategori/komponen-komputer.png'
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Komponen <br /> Komputer
              </p>
            </Link>
          </div>
        </div>
        <div className='col-8-custom'>
          <div className='text-center category-card'>
            <Link
              to='/aksesoris'
              className='text-decoration-none text-black'>
              <img
                src='img/kategori/komponen-laptop.png'
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Komponen <br /> Laptop
              </p>
            </Link>
          </div>
        </div>
        <div className='col-8-custom'>
          <div className='text-center category-card'>
            <Link
              to='/aksesoris'
              className='text-decoration-none text-black'>
              <img
                src='img/kategori/storage.png'
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Media <br /> Penyimpanan Data
              </p>
            </Link>
          </div>
        </div>
        <div className='col-8-custom'>
          <div className='text-center category-card pb-3'>
            <Link
              to='/aksesoris'
              className='text-decoration-none text-black'>
              <img
                src='img/kategori/memory-card.png'
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Memory Card
              </p>
            </Link>
          </div>
        </div>
        <div className='col-8-custom'>
          <div className='text-center category-card pb-3'>
            <Link
              to='/aksesoris'
              className='text-decoration-none text-black'>
              <img
                src='img/kategori/monitor.png'
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Monitor
              </p>
            </Link>
          </div>
        </div>
        <div className='col-8-custom'>
          <div className='text-center category-card pb-3'>
            <Link
              to='/aksesoris'
              className='text-decoration-none text-black'>
              <img
                src='img/kategori/network.png'
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Networking
              </p>
            </Link>
          </div>
        </div>
      </div>
      <div className='row mb-5'>
        <div className='col-8-custom'>
          <Link
            to='/aksesoris'
            className='text-decoration-none text-black'>
            <div className='text-center category-card'>
              <img
                src='img/kategori/aksesoris.png'
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Aksesoris Komputer & Laptop
              </p>
            </div>
          </Link>
        </div>
        <div className='col-8-custom'>
          <div className='text-center category-card'>
            <Link
              to='/aksesoris'
              className='text-decoration-none text-black'>
              <img
                src='img/kategori/kabel.png'
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Kabel & <br /> Adaptor
              </p>
            </Link>
          </div>
        </div>
        <div className='col-8-custom'>
          <div className='text-center category-card'>
            <Link
              to='/aksesoris'
              className='text-decoration-none text-black'>
              <img
                src='img/kategori/komponen-komputer.png'
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Komponen <br /> Komputer
              </p>
            </Link>
          </div>
        </div>
        <div className='col-8-custom'>
          <div className='text-center category-card'>
            <Link
              to='/aksesoris'
              className='text-decoration-none text-black'>
              <img
                src='img/kategori/komponen-laptop.png'
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Komponen <br /> Laptop
              </p>
            </Link>
          </div>
        </div>
        <div className='col-8-custom'>
          <div className='text-center category-card'>
            <Link
              to='/aksesoris'
              className='text-decoration-none text-black'>
              <img
                src='img/kategori/storage.png'
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Media <br /> Penyimpanan Data
              </p>
            </Link>
          </div>
        </div>
        <div className='col-8-custom'>
          <div className='text-center category-card pb-3'>
            <Link
              to='/aksesoris'
              className='text-decoration-none text-black'>
              <img
                src='img/kategori/memory-card.png'
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Memory Card
              </p>
            </Link>
          </div>
        </div>
        <div className='col-8-custom'>
          <div className='text-center category-card pb-3'>
            <Link
              to='/aksesoris'
              className='text-decoration-none text-black'>
              <img
                src='img/kategori/monitor.png'
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Monitor
              </p>
            </Link>
          </div>
        </div>
        <div className='col-8-custom'>
          <div className='text-center category-card pb-3'>
            <Link
              to='/aksesoris'
              className='text-decoration-none text-black'>
              <img
                src='img/kategori/network.png'
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Networking
              </p>
            </Link>
          </div>
        </div>
      </div>
      <div className='row mb-5'>
        <div className='col-8-custom'>
          <Link
            to='/aksesoris'
            className='text-decoration-none text-black'>
            <div className='text-center category-card'>
              <img
                src='img/kategori/aksesoris.png'
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Aksesoris Komputer & Laptop
              </p>
            </div>
          </Link>
        </div>
        <div className='col-8-custom'>
          <div className='text-center category-card'>
            <Link
              to='/aksesoris'
              className='text-decoration-none text-black'>
              <img
                src='img/kategori/kabel.png'
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Kabel & <br /> Adaptor
              </p>
            </Link>
          </div>
        </div>
        <div className='col-8-custom'>
          <div className='text-center category-card'>
            <Link
              to='/aksesoris'
              className='text-decoration-none text-black'>
              <img
                src='img/kategori/komponen-komputer.png'
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Komponen <br /> Komputer
              </p>
            </Link>
          </div>
        </div>
        <div className='col-8-custom'>
          <div className='text-center category-card'>
            <Link
              to='/aksesoris'
              className='text-decoration-none text-black'>
              <img
                src='img/kategori/komponen-laptop.png'
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Komponen <br /> Laptop
              </p>
            </Link>
          </div>
        </div>
        <div className='col-8-custom'>
          <div className='text-center category-card'>
            <Link
              to='/aksesoris'
              className='text-decoration-none text-black'>
              <img
                src='img/kategori/storage.png'
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Media <br /> Penyimpanan Data
              </p>
            </Link>
          </div>
        </div>
        <div className='col-8-custom'>
          <div className='text-center category-card pb-3'>
            <Link
              to='/aksesoris'
              className='text-decoration-none text-black'>
              <img
                src='img/kategori/memory-card.png'
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Memory Card
              </p>
            </Link>
          </div>
        </div>
        <div className='col-8-custom'>
          <div className='text-center category-card pb-3'>
            <Link
              to='/aksesoris'
              className='text-decoration-none text-black'>
              <img
                src='img/kategori/monitor.png'
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Monitor
              </p>
            </Link>
          </div>
        </div>
        <div className='col-8-custom'>
          <div className='text-center category-card pb-3'>
            <Link
              to='/aksesoris'
              className='text-decoration-none text-black'>
              <img
                src='img/kategori/network.png'
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Networking
              </p>
            </Link>
          </div>
        </div>
      </div>
      <div className='row mb-5'>
        <div className='col-8-custom'>
          <Link
            to='/aksesoris'
            className='text-decoration-none text-black'>
            <div className='text-center category-card'>
              <img
                src='img/kategori/aksesoris.png'
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Aksesoris Komputer & Laptop
              </p>
            </div>
          </Link>
        </div>
        <div className='col-8-custom'>
          <div className='text-center category-card'>
            <Link
              to='/aksesoris'
              className='text-decoration-none text-black'>
              <img
                src='img/kategori/kabel.png'
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Kabel & <br /> Adaptor
              </p>
            </Link>
          </div>
        </div>
        <div className='col-8-custom'>
          <div className='text-center category-card'>
            <Link
              to='/aksesoris'
              className='text-decoration-none text-black'>
              <img
                src='img/kategori/komponen-komputer.png'
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Komponen <br /> Komputer
              </p>
            </Link>
          </div>
        </div>
        <div className='col-8-custom'>
          <div className='text-center category-card'>
            <Link
              to='/aksesoris'
              className='text-decoration-none text-black'>
              <img
                src='img/kategori/komponen-laptop.png'
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Komponen <br /> Laptop
              </p>
            </Link>
          </div>
        </div>
        <div className='col-8-custom'>
          <div className='text-center category-card'>
            <Link
              to='/aksesoris'
              className='text-decoration-none text-black'>
              <img
                src='img/kategori/storage.png'
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Media <br /> Penyimpanan Data
              </p>
            </Link>
          </div>
        </div>
        <div className='col-8-custom'>
          <div className='text-center category-card pb-3'>
            <Link
              to='/aksesoris'
              className='text-decoration-none text-black'>
              <img
                src='img/kategori/memory-card.png'
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Memory Card
              </p>
            </Link>
          </div>
        </div>
        <div className='col-8-custom'>
          <div className='text-center category-card pb-3'>
            <Link
              to='/aksesoris'
              className='text-decoration-none text-black'>
              <img
                src='img/kategori/monitor.png'
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Monitor
              </p>
            </Link>
          </div>
        </div>
        <div className='col-8-custom'>
          <div className='text-center category-card pb-3'>
            <Link
              to='/aksesoris'
              className='text-decoration-none text-black'>
              <img
                src='img/kategori/network.png'
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Networking
              </p>
            </Link>
          </div>
        </div>
      </div>
      <div className='row mb-5'>
        <div className='col-8-custom'>
          <Link
            to='/aksesoris'
            className='text-decoration-none text-black'>
            <div className='text-center category-card'>
              <img
                src='img/kategori/aksesoris.png'
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Aksesoris Komputer & Laptop
              </p>
            </div>
          </Link>
        </div>
        <div className='col-8-custom'>
          <div className='text-center category-card'>
            <Link
              to='/aksesoris'
              className='text-decoration-none text-black'>
              <img
                src='img/kategori/kabel.png'
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Kabel & <br /> Adaptor
              </p>
            </Link>
          </div>
        </div>
        <div className='col-8-custom'>
          <div className='text-center category-card'>
            <Link
              to='/aksesoris'
              className='text-decoration-none text-black'>
              <img
                src='img/kategori/komponen-komputer.png'
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Komponen <br /> Komputer
              </p>
            </Link>
          </div>
        </div>
        <div className='col-8-custom'>
          <div className='text-center category-card'>
            <Link
              to='/aksesoris'
              className='text-decoration-none text-black'>
              <img
                src='img/kategori/komponen-laptop.png'
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Komponen <br /> Laptop
              </p>
            </Link>
          </div>
        </div>
        <div className='col-8-custom'>
          <div className='text-center category-card'>
            <Link
              to='/aksesoris'
              className='text-decoration-none text-black'>
              <img
                src='img/kategori/storage.png'
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Media <br /> Penyimpanan Data
              </p>
            </Link>
          </div>
        </div>
        <div className='col-8-custom'>
          <div className='text-center category-card pb-3'>
            <Link
              to='/aksesoris'
              className='text-decoration-none text-black'>
              <img
                src='img/kategori/memory-card.png'
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Memory Card
              </p>
            </Link>
          </div>
        </div>
        <div className='col-8-custom'>
          <div className='text-center category-card pb-3'>
            <Link
              to='/aksesoris'
              className='text-decoration-none text-black'>
              <img
                src='img/kategori/monitor.png'
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Monitor
              </p>
            </Link>
          </div>
        </div>
        <div className='col-8-custom'>
          <div className='text-center category-card pb-3'>
            <Link
              to='/aksesoris'
              className='text-decoration-none text-black'>
              <img
                src='img/kategori/network.png'
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Networking
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
  // }
}

export default Search
