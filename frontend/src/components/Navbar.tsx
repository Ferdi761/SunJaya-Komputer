import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useShoppingCart } from '../util/ShoppingCartContext'
import { FaShoppingCart } from 'react-icons/fa'
import { AiOutlineSearch } from 'react-icons/ai'
import { RiShoppingBagFill } from 'react-icons/ri'
import { BsChatTextFill } from 'react-icons/bs'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  if (
    location.pathname === '/login' ||
    location.pathname === '/register' ||
    location.pathname.startsWith('/admin')
  )
    return null

  const { cartQuantity } = useShoppingCart()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate('/search')
  }

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
          // value={q}
          // onChange={(e) => setQ(e.target.value)}
        />
        <button
          type='submit'
          className='absolute right-3 text-white bg-blue-500 py-3 px-5 -mr-3 rounded-lg'>
          <AiOutlineSearch />
        </button>
      </form>
      <Link to='/keranjang'>
        <button className='text-white text-lg font-semibold p-4 rounded-md hover:bg-gray-700 relative'>
          <FaShoppingCart />
          {cartQuantity > 0 && (
            <div className='rounded-full bg-red-600 flex justify-center items-center text-white w-7 h-7 absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4'>
              {cartQuantity}
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
      <Link to='/login'>
        <button className='text-white bg-dark text-lg font-semibold py-3 px-10 rounded-md hover:bg-gray-700'>
          Login
        </button>
      </Link>
    </nav>
  )
}

export default Navbar
