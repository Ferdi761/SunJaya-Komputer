import { useLocation } from 'react-router-dom'
import { HiLocationMarker } from 'react-icons/hi'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { RiWhatsappFill } from 'react-icons/ri'

const Footer = () => {
  const location = useLocation()
  if (
    location.pathname === '/keranjang' ||
    location.pathname.startsWith('/admin')
  )
    return null

  return (
    <footer className='w-full bg-primary text-white p-10 flex flex-col gap-3'>
      <h3 className='text-2xl font-bold ml-32'>Sun Jaya Komputer</h3>
      <ul className='flex flex-row gap-5 ml-32'>
        <li className='w-1/3'>Alamat</li>
        <li className='w-1/3'>Jam Operasional Kantor</li>
        <li className='w-1/3'>Hubungi kami jika ada pertanyaan</li>
      </ul>
      <ul className='flex flex-row gap-5 ml-32'>
        <li className='w-1/3 flex flex-row gap-2'>
          <HiLocationMarker />
          <p>
            Jl. Mojo Kidul II No.D2, Mojo, Kec. Gubeng, Kota Surabaya,
            Jawa Timur 60285
          </p>
        </li>
        <li className='w-1/3 flex flex-row gap-2'>
          <AiOutlineClockCircle />
          <p>09:00 - 20:00 WIB</p>
        </li>
        <li className='w-1/3 flex flex-row gap-2'>
          <RiWhatsappFill
            style={{ color: '#25D366' }}
            className='bg-white rounded-full'
          />
          <p>+628123270165</p>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
