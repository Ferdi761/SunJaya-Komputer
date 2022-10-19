import { Link } from 'react-router-dom'

const Category = () => (
  <div className='flex justify-center'>
    <div className='flex flex-col gap-5 w-2/3'>
      <h3 className='font-bold text-2xl'>Kategori</h3>
      <div className='flex flex-row gap-5'>
        <Link
          to='/kategori'
          className='flex flex-col items-center bg-light drop-shadow-xl w-28'>
          <div className='flex-none w-12 h-12 relative'>
            <img
              src='img/kategori/aksesoris.png'
              alt=''
              className='absolute w-full h-full object-cover'
              loading='lazy'
            />
          </div>
          <p className='text-center'>Aksesoris Komputer & Laptop</p>
        </Link>

        <Link
          to='/kategori'
          className='flex flex-col justify-center items-center bg-light drop-shadow-xl w-28'>
          <div className='flex-none w-12 h-12 relative'>
            <img
              src='img/kategori/kabel.png'
              alt=''
              className='absolute w-full h-full object-cover'
              loading='lazy'
            />
          </div>
          <p className='text-center'>Kabel & Adaptor</p>
        </Link>

        <Link
          to='/kategori'
          className='flex flex-col justify-center items-center bg-light drop-shadow-xl w-28'>
          <div className='flex-none w-12 h-12 relative'>
            <img
              src='img/kategori/komponen-komputer.png'
              alt=''
              className='absolute w-full h-full object-cover'
              loading='lazy'
            />
          </div>
          <p className='text-center'>Komponen Komputer</p>
        </Link>

        <Link
          to='/kategori'
          className='flex flex-col justify-center items-center bg-light drop-shadow-xl w-28'>
          <div className='flex-none w-12 h-12 relative'>
            <img
              src='img/kategori/komponen-laptop.png'
              alt=''
              className='absolute w-full h-full object-cover'
              loading='lazy'
            />
          </div>
          <p className='text-center'>Komponen Laptop</p>
        </Link>

        <Link
          to='/kategori'
          className='flex flex-col items-center bg-light drop-shadow-xl w-28'>
          <div className='flex-none w-12 h-12 relative'>
            <img
              src='img/kategori/storage.png'
              alt=''
              className='absolute w-full h-full object-cover'
              loading='lazy'
            />
          </div>
          <p className='text-center'>Media Penyimpanan Data</p>
        </Link>

        <Link
          to='/kategori'
          className='flex flex-col justify-center items-center bg-light drop-shadow-xl w-28'>
          <div className='flex-none w-12 h-12 relative'>
            <img
              src='img/kategori/memory-card.png'
              alt=''
              className='absolute w-full h-full object-cover'
              loading='lazy'
            />
          </div>
          <p className='text-center'>Memory Card</p>
        </Link>

        <Link
          to='/kategori'
          className='flex flex-col justify-center items-center bg-light drop-shadow-xl w-28'>
          <div className='flex-none w-12 h-12 relative'>
            <img
              src='img/kategori/monitor.png'
              alt=''
              className='absolute w-full h-full object-cover'
              loading='lazy'
            />
          </div>
          <p className='text-center'>Monitor</p>
        </Link>

        <Link
          to='/kategori'
          className='flex flex-col justify-center items-center bg-light drop-shadow-xl w-28'>
          <div className='flex-none w-12 h-12 relative'>
            <img
              src='img/kategori/network.png'
              alt=''
              className='absolute w-full h-full object-cover'
              loading='lazy'
            />
          </div>
          <p className='text-center'>Networking</p>
        </Link>
      </div>
    </div>
  </div>
)

export default Category
