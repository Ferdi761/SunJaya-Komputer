import React from 'react'
import SideScroll from './SideScroll'

const ProductsForYou = () => {
  return (
    <div className='container mb-5'>
      <h1 className='home-h1'>Produk Untuk Anda</h1>
      <SideScroll />
      <h1 className='home-h1'>Produk Terlaris</h1>
      <SideScroll />
      <h1 className='home-h1'>Produk Terbaru</h1>
      <SideScroll />
    </div>
  )
}

export default ProductsForYou
