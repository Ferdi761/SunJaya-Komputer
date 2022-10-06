import { useShoppingCart } from './ShoppingCartContext'
import storeItems from '../../data/items.json'
import CartDetail from './CartDetail'
import { useLocation } from 'react-router-dom'
import { formatCurrency } from '../../util/formatCurrency'

const Cart = () => {
  const location = useLocation()
  if (location.pathname !== '/keranjang') return null

  const { cartItems, cartQuantity } = useShoppingCart()

  return (
    <>
      <div className='container my-3'>
        <p className='mt-3'>
          Menampilkan daftar barang dalam keranjang <br />
          Total barang: {cartQuantity} jenis barang <br />
          Total Biaya:{' '}
          {formatCurrency(
            cartItems.reduce((total, cartItem) => {
              const item = storeItems.find(
                (i) => i.id === cartItem.id
              )
              return total + (item?.price || 0) * cartItem.quantity
            }, 0)
          )}
        </p>
        <div className='row'>
          <div className='col-7'>
            {cartItems.map((item) => (
              <CartDetail key={item.id} {...item} />
            ))}
          </div>
          <div className='col-4 ms-5'>
            <div
              className='p-3 text-white rounded'
              style={{ backgroundColor: '#262626' }}>
              <p>Rincian Keranjang</p>
              <ul className='list-group'>
                <li className='list-group-item d-flex justify-content-between align-items-start bg-transparent text-white p-0'>
                  <p>Total Barang</p>
                  <p>{cartQuantity} Barang</p>
                </li>
                <li className='list-group-item d-flex justify-content-between align-items-start bg-transparent text-white p-0'>
                  <p>Total Berat</p>
                  <p>1 Kg</p>
                </li>
                <li className='list-group-item d-flex justify-content-between align-items-start bg-transparent text-white p-0'>
                  <p>Total Belanja</p>
                  <p>
                    {formatCurrency(
                      cartItems.reduce((total, cartItem) => {
                        const item = storeItems.find(
                          (i) => i.id === cartItem.id
                        )
                        return (
                          total +
                          (item?.price || 0) * cartItem.quantity
                        )
                      }, 0)
                    )}
                  </p>
                </li>
              </ul>
              <div className='my-3'>
                <label
                  htmlFor='exampleFormControlTextarea1'
                  className='form-label text-white'>
                  Alamat
                </label>
                <textarea
                  className='form-control'
                  id='exampleFormControlTextarea1'
                  rows={3}
                  placeholder='*Tulis secara lengkap, kecamatan, kota, dan provinsi'></textarea>
              </div>
              <button className='btn btn-primary col-12'>
                PESAN
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
