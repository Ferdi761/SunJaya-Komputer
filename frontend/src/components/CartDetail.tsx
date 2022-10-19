import { useShoppingCart } from '../util/ShoppingCartContext'
import storeItems from '../data/items.json'
import { formatCurrency } from '../util/formatCurrency'
import { useState } from 'react'
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'
import { HiTrash } from 'react-icons/hi'

type CartItemProps = {
  id: number
  quantity: number
}

const CartDetail = ({ id, quantity }: CartItemProps) => {
  const sisa = 20

  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart()
  const jumlah = getItemQuantity(id)

  const item = storeItems.find((i) => i.id === id)
  if (item == null) return null

  return (
    <div className='flex font-sans p-5 gap-5 bg-darkGrey rounded-xl mb-5'>
      <div className='flex-none w-48 h-36 relative mr-5'>
        <img
          src={item.imgUrl}
          alt={item.name}
          className='absolute inset-0 w-full h-full object-cover'
          loading='lazy'
        />
      </div>

      <div className='flex flex-col w-1/2 gap-3 text-black'>
        <h1 className='text-2xl font-semibold'>{item.name}</h1>
        <p>{formatCurrency(item.price)}/barang</p>
        <p className='mt-10'>
          Total:{' '}
          <span className='font-bold'>
            {formatCurrency(item.price * quantity)}
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
              disabled={jumlah === 1 && true}
              data-field='quant[1]'
              onClick={() => decreaseCartQuantity(id)}>
              <AiFillMinusCircle />
            </button>
            <input
              type='text'
              name='quant[1]'
              className='px-5 w-full'
              value={jumlah}
              readOnly
              min='1'
              max='10'
            />
            <button
              type='button'
              className='p-3 border-l border-black disabled:opacity-50'
              data-type='plus'
              disabled={jumlah >= sisa && true}
              data-field='quant[1]'
              onClick={() => increaseCartQuantity(id)}>
              <AiFillPlusCircle />
            </button>
          </form>
          <p>
            Stok sisa: <span className='font-bold'>{sisa} buah</span>
          </p>
        </div>
        <div className='w-1/3 flex justify-center items-center'>
          <button
            className='p-3 bg-red-600 text-white rounded-lg'
            onClick={() => removeFromCart(item.id)}>
            <HiTrash />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartDetail
