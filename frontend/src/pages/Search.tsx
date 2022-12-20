import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { formatCurrency } from '../util/formatCurrency'
import { queryStorage } from '../util/queryStorage'

const Search = () => {
  const [barang, setBarang] = useState([
    {
      stok: 0,
      id: 0,
      nama: '',
      harga: 0,
      deskripsi: '',
      merek: '',
      berat: 0,
      jenisId: 0,
    },
  ])

  const { search } = useLocation()
  const name = new URLSearchParams(search).get('q')

  useEffect(() => {
    console.log(name)

    fetch(`http://localhost:8000/api/barang/cari?nama=${name}`)
      .then(async (res) => {
        const data = await res.json()
        console.log(data)

        setBarang(data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [search])

  return (
    <div className='grid grid-cols-3 gap-6 overflow-x-scroll'>
      {barang.map((item) => {
        return (
          <Link
            to={`/product/${item.id}`}
            className='flex flex-col items-center transition ease-in-out duration-200 bg-light hover:bg-gray-200 drop-shadow-xl my-3 pb-2 rounded-lg'
            key={item.id}
          >
            {/* <img
              src={`http://localhost:8000/produk/${
                item.foto.split('\\')[2]
              }`}
              alt={item.Barang.nama}
              className='w-5/6 h-auto object-cover'
              loading='lazy'
            /> */}
            <p>{item.nama}</p>
            <p>{formatCurrency(item.harga)}</p>
          </Link>
        )
      })}
    </div>
  )
}

export default Search
