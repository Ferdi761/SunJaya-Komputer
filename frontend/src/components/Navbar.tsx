import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import { AiOutlineSearch } from 'react-icons/ai'
import { RiShoppingBagFill } from 'react-icons/ri'
import { BsChatTextFill } from 'react-icons/bs'

import { userStorage } from '../util/userStorage'
import { cartStorage } from '../util/cartStorage'
import { queryStorage } from '../util/queryStorage'

const Navbar = () => {
  const [cart, setCart] = useState({
    daftarBarang: [
      {
        jumlah: 0,
        akunId: 0,
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
          FotoBarang: {
            id: 0,
            foto: '',
            BarangId: 0,
          },
        },
      },
    ],
    totalHarga: 0,
  })

  const location = useLocation()

  const { query, setQuery } = queryStorage()
  const { user, clearUser, getUser } = userStorage()
  const { cartStatus } = cartStorage()

  const navigate = useNavigate()

  useEffect(() => {
    getUser()
    user
      ? fetch('http://localhost:8000/api/keranjang', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        })
          .then(async (res) => {
            const data = await res.json()
            setCart(data.data)
          })
          .catch((err) => {
            console.log(err)
          })
      : null
  }, [cartStatus, user])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (query !== '') {
      navigate(`/search?q=${query}`)
    }
  }

  if (location.pathname.startsWith('/admin')) return null

  return (
    <nav className='flex flex-row justify-center gap-5 items-center h-20 p-7 sticky top-0 z-50 bg-black'>
      <Link to='/' className='text-2xl text-white'>
        Sun Jaya Com
      </Link>
      <form className='relative w-1/4 my-5' onSubmit={handleSubmit}>
        <input
          className='focus:ring-2 focus:ring-black focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-3 ring-1 ring-slate-200 shadow-sm'
          type='text'
          aria-label='Pencarian...'
          placeholder='Pencarian...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type='submit'
          className='absolute right-0 text-white bg-blue-500 hover:bg-blue-600 py-3 px-5 rounded-lg'
        >
          <AiOutlineSearch />
        </button>
      </form>
      <Link to='/keranjang'>
        <button className='text-white text-lg font-semibold p-4 rounded-md hover:bg-gray-700 relative'>
          <FaShoppingCart />
          {cart.daftarBarang.length > 0 && (
            <div className='rounded-full bg-red-600 flex justify-center items-center text-white w-7 h-7 absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4'>
              {cart.daftarBarang.reduce(
                (acc, cur) => acc + cur.jumlah,
                0
              )}
            </div>
          )}
        </button>
      </Link>
      <Link to='/pesanan-saya'>
        <button className='text-white text-lg font-semibold p-4 rounded-md hover:bg-gray-700'>
          <RiShoppingBagFill />
        </button>
      </Link>
      <Link to='/chat'>
        <button className='text-white text-lg font-semibold p-4 rounded-md hover:bg-gray-700'>
          <BsChatTextFill />
        </button>
      </Link>
      {user ? (
        <button
          className='text-white bg-dark text-lg font-semibold py-3 px-10 rounded-md hover:bg-gray-700'
          onClick={clearUser}
        >
          Logout
        </button>
      ) : (
        <Link to='/login'>
          <button className='text-white bg-dark text-lg font-semibold py-3 px-10 rounded-md hover:bg-gray-700'>
            Login
          </button>
        </Link>
      )}
    </nav>
  )
}

export default Navbar
