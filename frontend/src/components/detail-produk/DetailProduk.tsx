import { formatCurrency } from '../../util/formatCurrency'
import { useShoppingCart } from '../cart/ShoppingCartContext'

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
  return (
    <>
      <div className='container m-5 px-5'>
        <div className='row'>
          <div className='col-8'>
            <div
              className='card'
              style={{ width: '50rem', height: '25rem' }}>
              <div className='text-center bg-black rounded-top'>
                <img
                  src={imgUrl}
                  alt='cpu'
                  style={{ width: '15rem', height: '15rem' }}
                />
              </div>
              <div className='card-body'>
                <h5 className='card-title fw-bold border-bottom py-2'>
                  Deskripsi
                </h5>
                <p className='card-text'>
                  Core i3-71-- 3.9 GHz - Socket 1151 <br />
                  Garansi 1 minggu
                </p>
              </div>
            </div>
          </div>
          <div className='col-4'>
            <div className='card'>
              <div className='card-body'>
                <h5 className='card-title fw-bold'>
                  {formatCurrency(price)}
                </h5>
                <p className='card-text'>
                  {name}
                  <br />
                  Stok sisa: 4 buah <br />
                  Berat: 200 gram
                </p>
                <div className='text-center'>
                  <button
                    className='btn btn-primary rounded-pill'
                    onClick={() => increaseCartQuantity(id)}>
                    Masukkan keranjang
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
