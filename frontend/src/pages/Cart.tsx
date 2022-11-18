import { useShoppingCart } from '../util/ShoppingCartContext'
import storeItems from '../data/items.json'
import CartDetail from '../components/CartDetail'
import { useLocation } from 'react-router-dom'
import { formatCurrency } from '../util/formatCurrency'

const Cart = () => {
  const location = useLocation()
  if (location.pathname !== '/keranjang') return null

  const { cartItems, cartQuantity } = useShoppingCart()

  return (
    <>
      <div className='flex justify-center'>
        <div className='flex flex-col gap-5 w-10/12'>
          <p className='mt-10'>
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

          <div className='flex flex-row gap-5'>
            <div className='w-7/12'>
              {cartQuantity > 0 ? (
                cartItems.map((item) => (
                  <CartDetail key={item.id} {...item} />
                ))
              ) : (
                <div className='flex justify-center items-start bg-transparent text-black p-0'>
                  <p className='text-2xl mb-3'>
                    - Keranjang Kosong -
                  </p>
                </div>
              )}
            </div>
            <div className='w-5/12'>
              <div className='p-10 text-white bg-dark rounded-xl'>
                {cartQuantity > 0 ? (
                  <>
                    <p className='text-2xl mb-3'>Rincian Keranjang</p>
                    <ul>
                      <li className='flex justify-between items-start bg-transparent text-white p-0'>
                        <p>Total Barang</p>
                        <p className='font-semibold'>
                          {cartQuantity} Barang
                        </p>
                      </li>
                      <li className='flex justify-between items-start bg-transparent text-white p-0'>
                        <p>Total Berat</p>
                        <p className='font-semibold'>1 Kg</p>
                      </li>
                      <li className='flex justify-between items-start bg-transparent text-white p-0'>
                        <p>Total Belanja</p>
                        <p className='font-semibold'>
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
                    <form className='my-4'>
                      <label className='block text-md mb-2 font-semibold'>
                        Alamat
                      </label>
                      <textarea
                        className='focus:ring-2 focus:ring-black focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-5 ring-1 ring-slate-200 shadow-sm h-36'
                        aria-label='Alamat'
                        placeholder='*Tulis secara lengkap, kecamatan, kota, dan provinsi'
                        // value={akun.nama}
                        // onChange={(e) =>
                        //   setAkun({ ...akun, nama: e.target.value })
                        // }
                      />
                    </form>
                    <button className='bg-blue-700 hover:bg-blue-900 w-full rounded-xl font-bold text-2xl py-1 mt-10'>
                      Pesan
                    </button>
                  </>
                ) : (
                  <>
                    <p className='text-center text-2xl'>
                      - Keranjang Kosong
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
