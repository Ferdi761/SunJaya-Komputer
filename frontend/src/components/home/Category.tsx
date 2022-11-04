import { Link } from 'react-router-dom'
import aksesoris from '../../assets/img/kategori/aksesoris.png'
import kabel from '../../assets/img/kategori/kabel.png'
import komponenKomputer from '../../assets/img/kategori/komponen-komputer.png'
import komponenLaptop from '../../assets/img/kategori/komponen-laptop.png'
import storage from '../../assets/img/kategori/storage.png'
import memory from '../../assets/img/kategori/memory-card.png'
import monitor from '../../assets/img/kategori/monitor.png'
import network from '../../assets/img/kategori/network.png'

const Category = () => (
  <div className='flex justify-center'>
    <div className='flex flex-col gap-5 w-2/3'>
      <h3 className='font-bold text-2xl'>Kategori</h3>
      <div className='flex flex-row gap-5'>
        <Link
          to='/kategori'
          className='flex flex-col items-center bg-light drop-shadow-xl w-28'
        >
          <div className='flex-none w-12 h-12 relative'>
            <img
              src={aksesoris}
              alt=''
              className='absolute w-full h-full object-cover'
              loading='lazy'
            />
          </div>
          <p className='text-center'>Aksesoris Komputer & Laptop</p>
        </Link>

        <Link
          to='/kategori'
          className='flex flex-col justify-center items-center bg-light drop-shadow-xl w-28'
        >
          <div className='flex-none w-12 h-12 relative'>
            <img
              src={kabel}
              alt=''
              className='absolute w-full h-full object-cover'
              loading='lazy'
            />
          </div>
          <p className='text-center'>Kabel & Adaptor</p>
        </Link>

        <Link
          to='/kategori'
          className='flex flex-col justify-center items-center bg-light drop-shadow-xl w-28'
        >
          <div className='flex-none w-12 h-12 relative'>
            <img
              src={komponenKomputer}
              alt=''
              className='absolute w-full h-full object-cover'
              loading='lazy'
            />
          </div>
          <p className='text-center'>Komponen Komputer</p>
        </Link>

        <Link
          to='/kategori'
          className='flex flex-col justify-center items-center bg-light drop-shadow-xl w-28'
        >
          <div className='flex-none w-12 h-12 relative'>
            <img
              src={komponenLaptop}
              alt=''
              className='absolute w-full h-full object-cover'
              loading='lazy'
            />
          </div>
          <p className='text-center'>Komponen Laptop</p>
        </Link>

        <Link
          to='/kategori'
          className='flex flex-col items-center bg-light drop-shadow-xl w-28'
        >
          <div className='flex-none w-12 h-12 relative'>
            <img
              src={storage}
              alt=''
              className='absolute w-full h-full object-cover'
              loading='lazy'
            />
          </div>
          <p className='text-center'>Media Penyimpanan Data</p>
        </Link>

        <Link
          to='/kategori'
          className='flex flex-col justify-center items-center bg-light drop-shadow-xl w-28'
        >
          <div className='flex-none w-12 h-12 relative'>
            <img
              src={memory}
              alt=''
              className='absolute w-full h-full object-cover'
              loading='lazy'
            />
          </div>
          <p className='text-center'>Memory Card</p>
        </Link>

        <Link
          to='/kategori'
          className='flex flex-col justify-center items-center bg-light drop-shadow-xl w-28'
        >
          <div className='flex-none w-12 h-12 relative'>
            <img
              src={monitor}
              alt=''
              className='absolute w-full h-full object-cover'
              loading='lazy'
            />
          </div>
          <p className='text-center'>Monitor</p>
        </Link>

        <Link
          to='/kategori'
          className='flex flex-col justify-center items-center bg-light drop-shadow-xl w-28'
        >
          <div className='flex-none w-12 h-12 relative'>
            <img
              src={network}
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
