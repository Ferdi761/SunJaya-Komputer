import { Transition, Menu } from '@headlessui/react'
import { Fragment } from 'react'
import { BsChatTextFill } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../../../util/useStore'

const Navbar = () => {
  const { setUser } = useStore()

  const navigate = useNavigate()

  return (
    <div className='flex flex-row justify-between items-center h-20 p-7 sticky top-0 z-50 bg-black'>
      <Link to='/admin' className='text-2xl text-white'>
        Sun Jaya Com Admin
      </Link>
      <div className='flex flex-row items-center'>
        <Link to='/admin'>
          <button className='text-white text-lg font-semibold px-4 py-2 rounded-md hover:bg-gray-700'>
            Dashboard
          </button>
        </Link>
        <Link to='/admin/pesanan'>
          <button className='text-white text-lg font-semibold px-4 py-2 rounded-md hover:bg-gray-700'>
            Pesanan
          </button>
        </Link>
        <Link to='/admin/garansi'>
          <button className='text-white text-lg font-semibold px-4 py-2 rounded-md hover:bg-gray-700'>
            Garansi
          </button>
        </Link>
        <Link to='/admin/chat/0'>
          <button className='text-white text-lg font-semibold p-4 rounded-md hover:bg-gray-700'>
            <BsChatTextFill />
          </button>
        </Link>
      </div>
      <Menu as='div' className='relative inline-block text-left'>
        <div>
          <Menu.Button className='py-2'>
            <img
              src='data:image/jpeg;base64,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'
              alt='winter'
              className='w-12 h-12 rounded-full object-cover'
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <div className='px-1 py-1 '>
              <Menu.Item>
                {({ active }) => (
                  <div className='group flex flex-col w-full rounded-md px-2 py-2 text-sm'>
                    <p>Nugraha Akbar</p>
                    <span className='font-semibold'>
                      garuda.bangkit@gmail.com
                    </span>
                  </div>
                )}
              </Menu.Item>
            </div>
            <div className='px-1 py-1'>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? 'bg-violet-500 text-white'
                        : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Profile
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? 'bg-violet-500 text-white'
                        : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Settings
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className='px-1 py-1'>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? 'bg-violet-500 text-white'
                        : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => {
                      setUser(null)
                      navigate('/login')
                    }}
                  >
                    Sign Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default Navbar
