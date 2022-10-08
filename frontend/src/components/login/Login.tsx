import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <>
      <div
        className='container-fluid d-flex align-items-center'
        style={{
          backgroundColor: '#0E0E0E',
          height: '100vh',
        }}>
        <div
          className='container bg-secondary p-5 rounded-5'
          style={{ maxWidth: '40%' }}>
          <h1 className='text-white'>LOGIN ACCOUNT</h1>
          <div className='mb-3'>
            <label
              htmlFor='formGroupExampleInput2'
              className='form-label'>
              Nama atau Email
            </label>
            <input
              type='text'
              className='form-control'
              id='formGroupExampleInput2'
              placeholder='Username'
            />
          </div>
          <div className='mb-3'>
            <label
              htmlFor='formGroupExampleInput2'
              className='form-label'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              id='password'
              placeholder='Password'
            />
          </div>
          <div className='d-flex justify-content-between'>
            <button className='btn btn-dark'>
              <Link
                to='/register'
                className='text-white'
                style={{ textDecoration: 'none' }}>
                REGISTER
              </Link>
            </button>
            <div>
              <button className='btn btn-dark me-4'>Reset</button>
              <Link to='/'>
                <button className='btn btn-primary'>Submit</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
