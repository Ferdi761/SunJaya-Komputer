import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../../util/formatCurrency'

const SideScroll = () => {
  const [barang, setBarang] = useState([
    {
      id: 0,
      foto: '',
      BarangId: 0,
      Barang: {
        stok: 0,
        id: 0,
        nama: '',
        harga: 0,
        deskripsi: '',
        merek: '',
        berat: 0,
        jenisId: 0,
        JenisBarang: {
          id: 0,
          nama: '',
        },
      },
    },
  ])

  useEffect(() => {
    fetch('http://localhost:8000/api/barang')
      .then(async (res) => {
        const data = await res.json()
        setBarang(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className='flex flex-row gap-6 overflow-x-scroll'>
      {barang.map((item) => {
        return (
          <Link
            to={`/product/${item.id}`}
            className='flex flex-col items-center transition ease-in-out duration-200 bg-light hover:bg-gray-200 drop-shadow-xl my-3 pb-2 rounded-lg'
            key={item.id}
          >
            <div className='flex justify-center items-center w-48 h-48 relative'>
              <img
                src={`http://localhost:8000/produk/${
                  item.foto.split('\\')[2]
                }`}
                alt={item.Barang.nama}
                className='absolute w-5/6 h-5/6 object-cover'
                loading='lazy'
              />
            </div>
            <p>{item.Barang.nama}</p>
            <p>{formatCurrency(item.Barang.harga)}</p>
          </Link>
        )
      })}
    </div>
  )
}

export default SideScroll
