import { Dispatch, SetStateAction } from 'react'
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'
import { HiTrash } from 'react-icons/hi'
import { cartStorage } from '../util/cartStorage'

import { formatCurrency } from '../util/formatCurrency'
import { userStorage } from '../util/userStorage'

type CartItemProps = {
  stok: number
  id: number
  nama: string
  harga: number
  deskripsi: string
  merek: string
  berat: number
  jenisId: number
  Keranjang: {
    jumlah: number
    akunId: number
    BarangId: number
  }
}

const CartDetail = (props: CartItemProps) => {
  const { id, stok, nama, harga, Keranjang } = props

  const { user } = userStorage()
  const { cartStatus, changeCart } = cartStorage()

  const handleDelete = () => {
    fetch(`http://localhost:8000/api/keranjang/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json()
        console.log(data)

        if (data.status === 'success') {
          changeCart(!cartStatus)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // const handleIncrease = () => {
  //   fetch(`http://localhost:8000/api/keranjang/${id}`, {
  //     method: 'PUT',
  //     headers: {
  //       Authorization: `Bearer ${user?.token}`,
  //     },
  //     body: JSON.stringify({
  //       jumlah: Keranjang.jumlah + 1,
  //     }),
  //   })
  //     .then(async (res) => {
  //       const data = await res.json()
  //       if (data.status === 'success') {
  //         changeCart(!cartStatus)
  //         setStatus((prev) => !prev)
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

  return (
    <div className='flex font-sans p-5 gap-5 bg-darkGrey rounded-xl mb-5'>
      <div className='flex-none w-48 h-36 relative mr-5'>
        <img
          src=''
          alt={nama}
          className='absolute inset-0 w-full h-full object-cover'
          loading='lazy'
        />
      </div>

      <div className='flex flex-col w-1/2 gap-3 text-black'>
        <h1 className='text-2xl font-semibold'>{nama}</h1>
        <p>{formatCurrency(harga)}/barang</p>
        <p className='mt-10'>
          Total:{' '}
          <span className='font-bold'>
            {formatCurrency(harga * Keranjang.jumlah)}
          </span>
        </p>
      </div>

      <div className='w-1/2 flex flex-row'>
        <div className='flex flex-col gap-2 w-2/3 justify-center'>
          <p className='font-semibold'>Jumlah</p>
          <form className='flex flex-row bg-white rounded-xl border border-black'>
            <button
              type='button'
              className='p-3 border-r border-black disabled:opacity-50'
              data-type='minus'
              disabled={Keranjang.jumlah === 1 && true}
              data-field='quant[1]'
              // onClick={() => decreaseCartQuantity(id)}
            >
              <AiFillMinusCircle />
            </button>
            <input
              type='text'
              name='quant[1]'
              className='px-5 w-full'
              value={Keranjang.jumlah}
              readOnly
              min='1'
              max='10'
            />
            <button
              type='button'
              className='p-3 border-l border-black disabled:opacity-50'
              data-type='plus'
              disabled={Keranjang.jumlah >= stok && true}
              data-field='quant[1]'
              // onClick={() => handleIncrease()}
            >
              <AiFillPlusCircle />
            </button>
          </form>
          <p>
            Stok sisa: <span className='font-bold'>{stok} buah</span>
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
