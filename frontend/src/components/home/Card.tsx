import people from '../../assets/img/people.png'

const Card = () => {
  return (
    <div className='flex justify-center my-20'>
      <div className='flex flex-row pl-20 gap-5 shadow-2xl bg-dark w-2/3'>
        <div className='flex flex-col w-2/3 gap-3 text-white py-14'>
          <h1 className='text-3xl'>Melayani Sejak 1999</h1>
          <p className='text-gray-400'>
            Sun Jaya Komputer telah melayani jutaan pelanggan sejak
            pertama kali didirikan, baik itu secara luring, maupun
            daring, dan mendapatkan feedback positif positif dari
            seluruh pelanggan
          </p>
          <h2 className='text-3xl'>Apa yang kami punya ?</h2>
          <ul className='flex flex-row gap-6'>
            <li className='text-4xl w-2/12'>100</li>
            <li className='text-4xl w-2/12'>100</li>
            <li className='text-4xl w-2/12'>100</li>
            <li className='text-4xl w-2/12'>100</li>
            <li className='text-4xl w-2/12'>100</li>
            <li className='text-4xl w-2/12'>100</li>
          </ul>
          <ul className='flex flex-row gap-7 text-gray-400'>
            <li className='text-lg w-2/12'>Monitor</li>
            <li className='text-lg w-2/12'>Monitor</li>
            <li className='text-lg w-2/12'>Monitor</li>
            <li className='text-lg w-2/12'>Monitor</li>
            <li className='text-lg w-2/12'>Monitor</li>
            <li className='text-lg w-2/12'>Monitor</li>
          </ul>
        </div>
        <div
          className='py-20 pl-10'
          style={{ backgroundColor: '#302E2F' }}
        >
          <img src={people} alt='people' />
        </div>
      </div>
    </div>
  )
}

export default Card
