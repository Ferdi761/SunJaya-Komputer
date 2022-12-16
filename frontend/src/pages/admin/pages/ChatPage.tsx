import { useState } from 'react'
import { Link } from 'react-router-dom'
import { io } from 'socket.io-client'
import { ChatSocketController } from '../../../util/ChatSocketController'
import { useStore } from '../../../util/useStore'

const ChatPage = () => {
  const [chat, setChat] = useState('')
  const { user } = useStore()

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
          <div className='w-1/4 border-r-4 border-white'>
            <div className='flex flex-col py-5 px-10 border-b border-dark'>
              <p className='font-bold text-2xl'>Nama Pelanggan</p>
              <p id='aktif'>Isi Chat Terakhir</p>
            </div>
            <div className='flex flex-col py-5 px-10 border-b border-dark'>
              <p className='font-bold text-2xl'>Nama Pelanggan</p>
              <p id='aktif'>Isi Chat Terakhir</p>
            </div>
            <div className='flex flex-col py-5 px-10 border-b border-dark'>
              <p className='font-bold text-2xl'>Nama Pelanggan</p>
              <p id='aktif'>Isi Chat Terakhir</p>
            </div>
            <div className='flex flex-col py-5 px-10 border-b border-dark'>
              <p className='font-bold text-2xl'>Nama Pelanggan</p>
              <p id='aktif'>Isi Chat Terakhir</p>
            </div>
          </div>
          <div className='w-3/4 flex flex-col h-full'>
            <div className='flex flex-col py-5 px-10 border-b border-dark'>
              <p className='font-bold text-2xl'>Sun Jaya Komputer</p>
              <p id='aktif'>Aktif</p>
            </div>
            <div id='chats' className='flex-grow'></div>
            <form
              className='flex'
              onSubmit={function (e) {
                e.preventDefault()

                chatSocketController.sendMessage(chat)

                setChat('')

                console.log(chat)
              }}
            >
              <input
                className='focus:ring-2 focus:ring-black focus:outline-none appearance-none w-11/12 text-sm leading-6 text-slate-900 placeholder-primary rounded-md py-2 pl-5 ring-1 ring-slate-200 shadow-sm bg-formInput'
                type='text'
                id='chat-input'
                value={chat}
                onChange={(e) => setChat(e.target.value)}
                // onKeyDown={function (e) {
                //   if (e.key == 'Enter') {
                //     let chatText = (
                //       document.getElementById(
                //         'chat-input'
                //       ) as HTMLInputElement
                //     ).value
                //     ;(
                //       document.getElementById(
                //         'chat-input'
                //       ) as HTMLInputElement
                //     ).value = ''
                //     chatSocketController.sendMessage(chatText)
                //     console.log(chatSocketController)
                //   }
                // }}
              />
              <button
                className='bg-blue-700 w-1/12 rounded-lg'
                type='submit'
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default ChatPage
