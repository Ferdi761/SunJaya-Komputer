import React from 'react'
import { Link } from 'react-router-dom'
import storeItems from '../../data/items.json'
import { formatCurrency } from '../../util/formatCurrency'

const SideScroll = () => (
  <div className='flex flex-row gap-6 overflow-x-scroll'>
    {storeItems.map((item) => {
      return (
        <Link
          to={`/product/${item.id}`}
          className='flex flex-col items-center transition ease-in-out duration-200 bg-light hover:bg-gray-200 drop-shadow-xl my-3 pb-2 rounded-lg'
          key={item.id}>
          <div className='flex justify-center items-center w-48 h-48 relative'>
            <img
              src={item.imgUrl}
              alt={item.name}
              className='absolute w-5/6 h-5/6 object-cover'
              loading='lazy'
            />
          </div>
          <p>{item.name}</p>
          <p>{formatCurrency(item.price)}</p>
        </Link>
      )
    })}
  </div>
)

export default SideScroll
