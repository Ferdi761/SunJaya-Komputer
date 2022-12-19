import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { formatCurrency } from '../util/formatCurrency'

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
  
  const { pathname } = useLocation()
  
  useEffect(() => {
    fetch(
      `http://localhost:8000/api/barang/?cari=${pathname.split('/')[2]}`
    )
      .then(async (res) => {
        const data = await res.json()
        setBarang(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className='grid grid-cols-3 gap-6 overflow-x-scroll'>
      {barang.map((item) => {
        return (
          <Link
            to={`/product/${item.id}`}
            className='flex flex-col items-center transition ease-in-out duration-200 bg-light hover:bg-gray-200 drop-shadow-xl my-3 pb-2 rounded-lg'
            key={item.id}
          >
            <img
              src={`http://localhost:8000/produk/${
                item.foto.split('\\')[2]
              }`}
              alt={item.Barang.nama}
              className='w-5/6 h-auto object-cover'
              loading='lazy'
            />
            <p>{item.Barang.nama}</p>
            <p>{formatCurrency(item.Barang.harga)}</p>
          </Link>
        )
      })}
    </div>
  )
}

export default Search
