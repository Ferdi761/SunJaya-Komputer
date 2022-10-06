import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useShoppingCart } from '../cart/ShoppingCartContext'

const Navbar = () => {
  const location = useLocation()
  if (
    location.pathname === '/login' ||
    location.pathname === '/register'
  )
    return null

  const { cartQuantity } = useShoppingCart()

  return (
    <nav className='navbar navbar-expand-lg bg-black'>
      <div className='container-fluid'>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className='collapse navbar-collapse'
          id='navbarSupportedContent'>
          <ul className='navbar-nav mx-auto mb-2 mb-lg-0 mx-auto'>
            <Link className='navbar-brand text-white' to='/'>
              Sun Jaya Com
            </Link>
            <li className='nav-item'>
              <form className='d-flex' role='search'>
                <input
                  className='form-control me-2'
                  type='search'
                  placeholder='Search'
                  aria-label='Search'
                />
                <button
                  className='btn btn-outline-primary'
                  type='submit'>
                  Search
                </button>
              </form>
            </li>
            <li className='nav-item bg-black'>
              <Link
                to='/keranjang'
                className='nav-link'
                style={{ position: 'relative' }}>
                <i className='bi bi-cart-fill'></i>
                {cartQuantity > 0 && (
                  <div
                    className='rounded-circle bg-danger d-flex justify-content-center align-item-center text-white'
                    style={{
                      width: '1.5rem',
                      height: '1.5rem',
                      position: 'absolute',
                      bottom: '0',
                      right: '0',
                      transform: 'translate(25%,25%)',
                    }}>
                    {cartQuantity}
                  </div>
                )}
              </Link>
            </li>
            <li className='nav-item bg-black'>
              <Link className='nav-link' to='/pesanan-saya'>
                <i className='bi bi-bag-fill'></i>
              </Link>
            </li>
            <li className='nav-item bg-secondary'>
              <Link className='nav-link' to='/login'>
                <i className='bi bi-person-circle'></i> Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
