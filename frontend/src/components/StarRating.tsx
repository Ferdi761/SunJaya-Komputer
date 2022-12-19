import { Dispatch, SetStateAction, useState } from 'react'

type StarRatingProps = {
  rating: number
  setRating: Dispatch<SetStateAction<number>>
}

const StarRating = ({ rating, setRating }: StarRatingProps) => {
  const [hover, setHover] = useState(0)

  return (
    <div className='star-rating'>
      {[...Array(5)].map((star, index) => {
        index += 1
        return (
          <button
            type='button'
            key={index}
            className={`${
              index <= (hover || rating)
                ? 'text-yellow-400'
                : 'text-white'
            }`}
            onClick={() => setRating(index)}
            onDoubleClick={() => {
              setRating(0)
              setHover(0)
            }}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className='text-3xl mx-2'>&#9733;</span>
          </button>
        )
      })}
    </div>
  )
}

export default StarRating
