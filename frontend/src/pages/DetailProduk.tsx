import { formatCurrency } from '../util/formatCurrency'
import { useShoppingCart } from '../util/ShoppingCartContext'

type StoreItemProps = {
  id: number
  name: string
  price: number
  imgUrl: string
}

const DetailProduk = ({
  id,
  name,
  price,
  imgUrl,
}: StoreItemProps) => {
  const { getItemQuantity, increaseCartQuantity } = useShoppingCart()

  const quantity = getItemQuantity(id)

  return (
    <>
      <div className='flex justify-center'>
        <div className='w-11/12 flex flex-row gap-10 my-10'>
          <div className='w-8/12'>
            <div
              className='flex flex-col'
              style={{ width: '50rem', height: '25rem' }}>
              <div className='flex justify-center bg-black rounded-t-xl'>
                <img src={imgUrl} alt='cpu' className='w-60 h-60' />
              </div>
              <div className='border border-black rounded-b-xl px-10'>
                <h5 className='font-bold border-b border-gray-500 py-2'>
                  Deskripsi
                </h5>
                <p className='py-3'>
                  Core i3-71-- 3.9 GHz - Socket 1151 <br />
                  Garansi 1 minggu
                </p>
              </div>
            </div>
          </div>
          <div className='w-4/12'>
            <div className='flex flex-col border border-black rounded-xl p-10'>
              <div className='flex flex-col gap-2'>
                <h5 className='text-2xl font-bold'>
                  {formatCurrency(price)}
                </h5>
                <p className='text-lg'>{name} </p>
                <p>Stok sisa: 4 buah</p>
                <p>Berat: 200 gram</p>
                <div className='text-center mt-5'>
                  <button
                    className='bg-blue-700 text-white hover:bg-blue-900 rounded-full px-10 py-2'
                    onClick={() => increaseCartQuantity(id)}>
                    {quantity > 0
                      ? 'Tambah ke keranjang'
                      : 'Masukkan keranjang'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailProduk
