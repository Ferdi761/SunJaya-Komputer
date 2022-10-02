import React from 'react';

const Navbar = () => {
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
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className='collapse navbar-collapse'
          id='navbarSupportedContent'
        >
          <ul className='navbar-nav mx-auto mb-2 mb-lg-0 mx-auto'>
            <a className='navbar-brand text-white' href='/'>
              Sun Jaya Com
            </a>
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
                  type='submit'
                >
                  Search
                </button>
              </form>
            </li>
            <li className='nav-item'>
              <a className='nav-link' aria-current='page' href='/'>
                <i className='bi bi-cart-fill'></i>
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/'>
                <i className='bi bi-bag-fill'></i>
              </a>
            </li>
            <li className='nav-item bg-secondary'>
              <a className='nav-link' href='/'>
                <i className='bi bi-person-circle'></i> Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
