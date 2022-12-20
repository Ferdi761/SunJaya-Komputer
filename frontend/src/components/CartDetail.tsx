import { Dispatch, SetStateAction, useState } from 'react'
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'
import { HiTrash } from 'react-icons/hi'
import { cartStorage } from '../util/cartStorage'

import { formatCurrency } from '../util/formatCurrency'
import { userStorage } from '../util/userStorage'

type CartItemProps = {
  jumlah: number
  akunId: number
  BarangId: number
  Barang: {
    stok: number
    id: number
    nama: string
    harga: number
    deskripsi: string
    merek: string
    berat: number
    jenisId: number
    FotoBarang: {
      id: number
      foto: string
      BarangId: number
    }
  }
}

const CartDetail = (props: CartItemProps) => {
  const { jumlah, BarangId, Barang } = props

  // const [mode, setMode] = useState<'+' | '-' | '0'>('0')

  const { user } = userStorage()
  const { changeCart } = cartStorage()

  const handleDelete = () => {
    fetch(`http://localhost:8000/api/keranjang/${BarangId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json()
        console.log(data)

        if (data.status === 'success') {
          changeCart()
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleChange = () => {
    const data = jumlah - 1
    fetch(`http://localhost:8000/api/keranjang/${BarangId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify({
        jumlah: data,
      }),
    })
      .then(async (res) => {
        const data = await res.json()
        console.log(data)

        if (data.status === 'success') {
          changeCart()
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleIncrease = () => {
    const data = {
      barangId: BarangId,
      jumlah: 1,
    }

    fetch(`http://localhost:8000/api/keranjang/${BarangId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user?.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        const data = await res.json()
        if (data.status === 'success') {
          changeCart()
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className='flex font-sans p-5 gap-5 bg-darkGrey rounded-xl mb-5'>
      <div className='flex-none w-48 h-36 relative mr-5'>
        <img
          src={`http://localhost:8000/produk/${
            Barang.FotoBarang.foto.split('\\')[2]
          }`}
          alt={Barang.nama}
          className='absolute inset-0 w-full h-full object-cover'
          loading='lazy'
        />
      </div>

      <div className='flex flex-col w-1/2 gap-3 text-black'>
        <h1 className='text-2xl font-semibold'>{Barang.nama}</h1>
        <p>{formatCurrency(Barang.harga)}/barang</p>
        <p className='mt-10'>
          Total:{' '}
          <span className='font-bold'>
            {formatCurrency(Barang.harga * jumlah)}
          </span>
        </p>
      </div>

      <div className='w-1/2 flex flex-row'>
        <div className='flex flex-col gap-2 w-2/3 justify-center'>
          <p className='font-semibold'>Jumlah</p>
          <form className='flex flex-row bg-white rounded-xl border border-black'>
            <button
              type='button'
              className='p-3 border-r border-black disabled:opacity-50 hover:bg-red-600 hover:text-white rounded-l-xl'
              disabled={jumlah === 1 ? true : false}
              onClick={() => handleChange()}
            >
              <AiFillMinusCircle />
            </button>
            <p className='px-5 w-full flex items-center justify-center'>
              {jumlah}
            </p>
            <button
              type='button'
              className='p-3 border-l border-black disabled:opacity-50 hover:bg-green-600 hover:text-white rounded-r-xl'
              disabled={jumlah >= Barang.stok && true}
              onClick={() => handleIncrease()}
            >
              <AiFillPlusCircle />
            </button>
          </form>
          <p>
            Stok sisa:{' '}
            <span className='font-bold'>{Barang.stok} buah</span>
          </p>
        </div>
        <div className='w-1/3 flex justify-center items-center'>
          <button
            className='p-3 bg-red-600 text-white rounded-lg'
            onClick={() => handleDelete()}
          >
            <HiTrash />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartDetail
