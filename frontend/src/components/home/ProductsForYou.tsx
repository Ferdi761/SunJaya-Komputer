import React from 'react'
import SideScroll from './SideScroll'

const ProductsForYou = () => {
  return (
    <div className='flex flex-col justify-center items-center my-10'>
      <div className='w-2/3'>
        <h1 className='font-bold text-2xl mb-5'>Produk Untuk Anda</h1>
        <SideScroll />
        <h1 className='font-bold text-2xl my-5'>Produk Terlaris</h1>
        <SideScroll />
        <h1 className='font-bold text-2xl my-5'>Produk Terbaru</h1>
        <SideScroll />
      </div>
    </div>
  )
}

export default ProductsForYou
