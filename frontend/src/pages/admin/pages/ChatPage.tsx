import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { io } from 'socket.io-client'
import { ChatSocketController } from '../../../util/ChatSocketController'
import { userStorage } from '../../../util/userStorage'
import Chat from './Chat'

const ChatPage = () => {
  const [chat, setChat] = useState('')
  const { user } = userStorage()
  const location = useLocation()

  if (!user) {
    return (
      <div className='bg-primary h-screen text-white flex flex-col justify-center items-center'>
        <p>You need to login to chat.</p>
        <Link
          to='/login'
          className='bg-blue-700 hover:bg-blue-900 w-fit rounded-lg px-2 py-1 text-white'
        >
          Login
        </Link>
      </div>
    )
  } else {
    const chatSocketController = new ChatSocketController(
      io('http://localhost:8000').connect()
    )

    chatSocketController.addCallback(
      'message self read',
      function (message: string) {
        // munculkan teks yang dikirim sendiri dengan penanda sudah di read
      }
    )

    chatSocketController.addCallback(
      'message self unread',
      function (message: string) {
        // munculkan teks yang dikirim sendiri dengan penanda belum di read
      }
    )

    chatSocketController.addCallback(
      'message to',
      function (message: string) {
        // munculkan teks yang dikirim dari pelanggan (lawan bicara)
      }
    )

    chatSocketController.addCallback(
      'aktif',
      function (message: string) {
        // mengganti tanda apakah pelanggan aktif atau tidak
        let aktif = document.getElementById(
          'aktif'
        ) as HTMLParagraphElement
        aktif.innerHTML = message
      }
    )

    chatSocketController.addCallback(
      'readall',
      function (message: string) {
        // buat semua chat dari pelanggan ditandai sudah di read
      }
    )

    chatSocketController.addCallback(
      'denied',
      function (message: string) {
        // buat tulisan kalau chat tidak bisa dibaca karena sudah ada karyawan lain yang buka chat ini
      }
    )

    chatSocketController.addCallback(
      'readed',
      function (message: string) {
        let customerID = parseInt(message)
        // tandai list chat pelanggan dengan ID: customerID sudah di read (sudah ada karyawan yang membuka chat ini)
      }
    )

    chatSocketController.addCallback(
      'coming unread',
      function (message: string) {
        let customerID = parseInt(message)
        // perbarui list chat pelanggan karena pelanggan dengan ID: customerID mengirim chat baru namun belum dibaca
      }
    )

    chatSocketController.addCallback(
      'coming read',
      function (message: string) {
        let customerID = parseInt(message)
        // perbarui list chat pelanggan karena pelanggan dengan ID: customerID mengirim chat baru dan telah dibaca
      }
    )

    chatSocketController.init(user.id)
    chatSocketController.auth(user.izin)
    chatSocketController.read(-1)
    // pada admin dan karyawan, read itu dibutuhkan untuk menandakan chat pelanggan mana yang ingin dibuka
    // parameternya adalah ID pelanggan yang mau dibuka chatnya
    // kalau nilainya -1 artinya tidak membuka satupun chat pelanggan

    return (
      <div className='bg-primary h-screen text-white flex justify-center'>
        <div className='w-2/3 bg-black my-10 border border-dark flex'>
          <div className='w-1/4 border-r-4 border-white flex flex-col py-5'>
            <h1 className='text-center text-2xl font-semibold'>
              Obrolan
            </h1>
            <form className='group relative w-full px-5 my-5'>
              <input
                className='focus:ring-2 focus:ring-white focus:outline-none appearance-none w-full text-sm leading-6 text-white placeholder-slate-200 rounded-md py-2 pl-10 ring-1 ring-black shadow-sm bg-dark'
                type='text'
                aria-label='Cari Obrolan'
                placeholder='Cari Obrolan'
                // value={q}
                // onChange={(e) => setQ(e.target.value)}
              />
              <svg
                width='20'
                height='20'
                fill='currentColor'
                className='absolute left-6 top-1/2 -mt-2.5 text-slate-200 pointer-events-none group-focus-within:text-white'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                />
              </svg>
            </form>
            <Link
              to={`/admin/chat/12`}
              className={`flex flex-col py-5 px-5 ${
                location.pathname === '/admin/chat/12'
                  ? 'bg-dark'
                  : 'hover:bg-dark'
              }`}
            >
              <p className='font-medium text-lg'>Nama Pelanggan</p>
              <p id='aktif' className='text-sm text-gray-400'>
                Isi Chat Terakhir
              </p>
            </Link>
          </div>
          <Chat
            chatSocketController={chatSocketController}
            chat={chat}
            setChat={setChat}
            location={location}
          />
        </div>
      </div>
    )
  }
}

export default ChatPage
