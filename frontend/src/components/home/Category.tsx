import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import aksesoris from '../../assets/img/kategori/aksesoris.png'
import kabel from '../../assets/img/kategori/kabel.png'
import komponenKomputer from '../../assets/img/kategori/komponen-komputer.png'
import komponenLaptop from '../../assets/img/kategori/komponen-laptop.png'
import storage from '../../assets/img/kategori/storage.png'
import memory from '../../assets/img/kategori/memory-card.png'
import monitor from '../../assets/img/kategori/monitor.png'
import network from '../../assets/img/kategori/network.png'

const Category = () => {
  const [categories, setCategories] = useState([
    {
      id: 0,
      nama: '',
    },
  ])

  useEffect(() => {
    fetch('http://localhost:8000/api/jenis')
      .then(async (res) => {
        const data = await res.json()
        setCategories(data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className='flex justify-center'>
      <div className='flex flex-col gap-5 w-2/3'>
        <h3 className='font-bold text-2xl'>Kategori</h3>
        <div className='flex flex-row gap-5'>
          {categories.map((category) => (
            <Link
              to={`/kategori/${category.nama}`}
              className='flex flex-col items-center bg-light drop-shadow-xl w-28'
              key={category.id}
            >
              <div className='flex-none w-12 h-12 relative'>
                <img
                  src={aksesoris}
                  alt=''
                  className='absolute w-full h-full object-cover'
                  loading='lazy'
                />
              </div>
              <p className='text-center'>{category.nama}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Category
