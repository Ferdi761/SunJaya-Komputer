import Card from '../components/home/Card'
import Category from '../components/home/Category'
import ProductsForYou from '../components/home/ProductsForYou'

import hdd from '../assets/img/hdd.png'
import caseImage from '../assets/img/case.png'
import monitor from '../assets/img/monitor.png'

const Home = () => {
  return (
    <>
      <section className='flex flex-row gap-10 h-screen bg-primary'>
        <div className='flex flex-col w-1/2 pl-20 justify-center -mt-10'>
          <h1 className='text-5xl text-white font-bold mb-5 tracking-wide'>
            Sun Jaya Komputer
          </h1>
          <h2 className='text-3xl text-white mb-5'>
            Menyediakan berbagai perangkat
            <br />
            komputer — murah — dengan <br /> kualitas terjamin.
          </h2>
          <p className='text-lg text-gray-500'>
            Dapatkan seluruh perangkat komputer yang anda butuhkan
            untuk menunjang seluruh aktifitas keseharian anda. siap
            untuk kami kirim.
          </p>
        </div>

        <div className='flex flex-col w-1/2 pr-16 mt-10'>
          <div className='flex font-sans py-2 pl-2 gap-5 ml-20 -z-0'>
            <div className='flex flex-col w-full gap-3 text-gray-300'>
              <h1 className='text-2xl'>Seluruh Indonesia</h1>
              <p>
                Dengan seluruh pelayanan yang kami berikan membuat
                perangkat kami terjual ke seluruh Indonesia
              </p>
            </div>
            <div className='flex-none w-36 h-36 relative mr-5'>
              <img
                src={hdd}
                alt='hard drive'
                className='absolute inset-0 w-full h-full object-cover'
                loading='lazy'
              />
            </div>
          </div>

          <div className='flex font-sans px-5 py-8 gap-5 bg-white shadow-2xl -mt-7 z-10 mr-20'>
            <div className='flex flex-col w-full gap-3'>
              <h1 className='text-2xl'>Kualitas Terjamin</h1>
              <p>
                Seluruh perangkat yang kami sediakan telah melewati
                berbagai macam pengecekan agar perangkat yang sampai
                kepada Anda memiliki kualitas yang terjamin
              </p>
            </div>
            <div className='flex-none w-48 h-48 relative mr-5'>
              <img
                src={caseImage}
                alt=''
                className='absolute inset-0 w-full h-full object-cover'
                loading='lazy'
              />
            </div>
          </div>

          <div className='flex font-sans py-10 pl-2 gap-5 ml-20 -z-0 bg-darkGrey -mt-7'>
            <div className='flex-none w-48 h-36 relative mr-5'>
              <img
                src={monitor}
                alt=''
                className='absolute inset-0 w-full h-full object-cover'
                loading='lazy'
              />
            </div>
            <div className='flex flex-col w-full gap-3 text-black'>
              <h1 className='text-2xl'>Harga Termurah</h1>
              <p>
                Harga yang kami tawarkan merupakan harga termurah
                untuk perangkat dengan kualitas terbaik
              </p>
            </div>
          </div>
        </div>
      </section>
      <Card />
      <Category />
      <div>
        <ProductsForYou />
      </div>
    </>
  )
}

export default Home
