import { Link } from 'react-router-dom'
import { HiChatBubbleLeftRight } from 'react-icons/hi2'

import type { Pesanan } from '../../../util/type'

const TabelPesanan = (pesanan: Pesanan) => {
  return (
    <div className='rounded-lg bg-light py-2 mb-10'>
      <div className='flex flex-row gap-10 px-5 mb-2 shadow-lg'>
        <p>
          Achmad Ferdiansyah
          <br />
          ID: #20
        </p>
        <Link to='/admin/chat'>
          <HiChatBubbleLeftRight className='w-8 h-8 text-blue-500' />
        </Link>
      </div>
      <div className='px-5'>
        <p className='w-full border-b'>ID pesanan: #114</p>
        <div className='flex font-sans p-2'>
          <div className='flex-none w-24 h-24 relative mr-5'>
            <img
              src='img/produk/cpu-corei3.png'
              alt=''
              className='absolute inset-0 w-full h-full object-cover'
              loading='lazy'
            />
          </div>
          <div className='flex flex-col w-full'>
            <div className='flex flex-row justify-between'>
              <h3 className='text-lg font-semibold text-slate-900'>
                Core I5-7400 3,0 Ghz Gen7 Kabylake - Socket 1151
              </h3>
              <p className='text-lg font-normal text-slate-900'>
                Rp. 1.500.000
              </p>
              <p className='text-lg font-normal text-slate-900'>
                6 Juni 2022
              </p>
              <p className='text-lg font-normal text-slate-900'>
                Selesai
              </p>
              <Link
                to='/admin/garansi'
                className='text-lg font-normal text-blue-500 hover:text-blue-700'
              >
                Rincian
              </Link>
            </div>
            <p>
              Jumlah: <span className='font-bold'>1 buah</span>
            </p>
          </div>
        </div>
        <div className='flex font-sans p-2'>
          <div className='flex-none w-24 h-24 relative mr-5'>
            <img
              src='img/monitor.png'
              alt=''
              className='absolute inset-0 w-full h-full object-cover'
              loading='lazy'
            />
          </div>
          <div className='flex flex-col w-full'>
            <h3 className='text-lg font-semibold text-slate-900'>
              Monitor
            </h3>
            <p>
              Jumlah: <span className='font-bold'>1 buah</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TabelPesanan
