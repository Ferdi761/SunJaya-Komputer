import { useShoppingCart } from './ShoppingCartContext'
import storeItems from '../../data/items.json'
import { formatCurrency } from '../../util/formatCurrency'
import { useState } from 'react'

type CartItemProps = {
  id: number
  quantity: number
}

const CartDetail = ({ id, quantity }: CartItemProps) => {
  const sisa = 4

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
    <div
      className='row mb-2 p-2 d-flex align-items-center'
      style={{
        backgroundColor: '#F9F9F9',
        boxShadow: 'rgba(0, 0, 0, 0.24) 5px 5px 6px',
      }}>
      <div className='col-3'>
        <img
          src={item.imgUrl}
          alt='cpu'
          width='128px'
          height='128px'
        />
      </div>
      <div className='col-5'>
        <p>{item.name}</p>
        <p>{formatCurrency(item.price)}/barang</p>
        <p>Total: {formatCurrency(item.price * quantity)}</p>
      </div>
      <div className='col-3'>
        <p>Jumlah</p>
        <div className='input-group'>
          <span className='input-group-btn'>
            <button
              type='button'
              className='btn btn-default btn-number'
              data-type='minus'
              disabled={jumlah === 1 && true}
              data-field='quant[1]'
              onClick={() => decreaseCartQuantity(id)}>
              <i className='bi bi-dash-circle-fill'></i>
            </button>
          </span>
          <input
            type='text'
            name='quant[1]'
            className='form-control input-number'
            value={jumlah}
            min='1'
            max='10'
          />
          <span className='input-group-btn'>
            <button
              type='button'
              className='btn btn-default btn-number'
              data-type='plus'
              disabled={jumlah >= sisa && true}
              data-field='quant[1]'
              onClick={() => increaseCartQuantity(id)}>
              <i className='bi bi-plus-circle-fill'></i>
            </button>
          </span>
        </div>
        <p>Stok sisa: {sisa} buah</p>
      </div>
      <div className='col-1 '>
        <button
          className='btn btn-danger'
          onClick={() => removeFromCart(item.id)}>
          <i className='bi bi-trash-fill'></i>
        </button>
      </div>
    </div>
  )
}

export default CartDetail
