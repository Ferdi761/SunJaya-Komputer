import React from 'react'
import { Link } from 'react-router-dom'
import storeItems from '../../data/items.json'
import { formatCurrency } from '../../util/formatCurrency'

const SideScroll = () => {
  return (
    <div className='side-scroll d-flex w-100 mb-3'>
      {storeItems.map((item) => {
        return (
          <div
            className='text-center category-card m-3 p-2'
            key={item.id}>
            <Link to={`/product/${item.id}`}>
              <img
                src={item.imgUrl}
                alt='monitor'
                width='100px'
                height='100px'
              />
            </Link>
            <p
              className='card-text mt-3'
              style={{ fontSize: '12px' }}>
              {formatCurrency(item.price)}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default SideScroll
