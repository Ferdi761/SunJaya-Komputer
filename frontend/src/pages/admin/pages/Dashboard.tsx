import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => (
  <div className='flex items-center justify-center flex-col my-20'>
    <h1 className='font-bold text-2xl'>Buka Penyimpanan</h1>
    <div className='flex flex-row gap-10'>
      <Link
        to='/admin/barang'
        className='p-20 border text-lg font-semibold border-black rounded-lg my-5 shadow-xl'
      >
        BARANG
      </Link>
      <Link
        to='/admin/akun'
        className='p-20 border text-lg font-semibold border-black rounded-lg my-5 shadow-xl'
      >
        AKUN
      </Link>
    </div>
    <div className='flex flex-row gap-10'>
      <Link
        to='/admin/rekening'
        className='p-20 border text-lg font-semibold border-black rounded-lg my-5 shadow-xl'
      >
        REKENING
      </Link>
      <Link
        to='/admin/jenis-barang'
        className='p-20 border text-lg font-semibold border-black rounded-lg my-5 shadow-xl text-center'
      >
        JENIS
        <br />
        BARANG
      </Link>
    </div>
  </div>
)

export default Dashboard
