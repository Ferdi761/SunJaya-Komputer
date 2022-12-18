import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { io } from 'socket.io-client'
import { ChatData } from '../../../util/ChatData'
import { ChatSenderData } from '../../../util/ChatSenderData'
import { ChatSocketController } from '../../../util/ChatSocketController'
import { userStorage } from '../../../util/userStorage'
import Chat from './Chat'

const chatSocketController = new ChatSocketController(
  io('http://localhost:8000').connect()
)

const ChatPage = () => {
  const [chat, setChat] = useState('')
  const [id, setId] = useState(0)
  const [daftarChat, setDaftarChat] = useState<ChatData[]>([])
  const [daftarLawanBicara, setDaftarLawanBicara] = useState<Map<number, ChatSenderData>>(new Map<number, ChatSenderData>)
  const [daftarLawanBicaraArray, setDaftarLawanBicaraArray] = useState<ChatSenderData[]>([])

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

    useEffect(() => {
  
      chatSocketController.init(user.id)
      chatSocketController.auth(user.izin)

      chatSocketController.addCallback(
        'message self read',
        function (message: string) {
          // munculkan teks yang dikirim sendiri dengan penanda sudah di read
          // jadi chat yang kita tulis tidak langsung ditampilkan di layar namun
          // dikirim dahulu ke server, kemudian chat akan dikirim balik oleh server
          // baru dimunculkan
          // chat yang dikirim juga ditandai sudah di read
          setDaftarChat((chat) => [...chat, new ChatData(message, false)])
        }
      )
  
      chatSocketController.addCallback(
        'message self unread',
        function (message: string) {
          // munculkan teks yang dikirim sendiri dengan penanda belum di read
          // sama kayak "message self read" cuman belum di read
          setDaftarChat((chat) => [...chat, new ChatData(message, false)])
        }
      )
  
      chatSocketController.addCallback(
        'message to',
        function (message: string) {
          // munculkan teks yang dikirim dari lawan bicara (pelanggan)
          // dapat chat dari lawan bicara (pelanggan)
          setDaftarChat((chat) => [...chat, new ChatData(message, true)])
        }
      )
  
      chatSocketController.addCallback(
        'aktif',
        function (message: string) {
          // mengganti tanda apakah pelanggan yang dibuka chatnya aktif atau tidak
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
          // chat sendiri, bukan daftar pelanggan (yang di kiri layar itu, yang daftar-daftar
          // chat dari pelanggan) yang ngechat
        }
      )
  
      chatSocketController.addCallback(
        'readed',
        function (message: string) {
          let customerID = parseInt(message)
          // tandai list chat pelanggan dengan ID: customerID sudah di read (sudah ada karyawan yang membuka chat ini)
  
          // jadi itu yang daftar chat masuk dari pelanggan-pelanggan yang ada di kiri layar, ditandai kalau sudah
          // dibaca, ini bisa terjadi karena karyawan kan ada banyak dan yang lain bisa baca jadi ketika ada satu karyawan
          // yang sudah baca, semua karyawan diberi tahu kalau chat pelanggan tertentu sudah dibaca
          if (daftarLawanBicara.has(customerID)) {
            let data = daftarLawanBicara.get(customerID);
            data?.setRead(true);
          }
          daftarLawanBicaraArray.sort(function (a : ChatSenderData, b : ChatSenderData) {
            return a.getRead() ? 1 : -1;
          });
        
        }
      )
  
      chatSocketController.addCallback(
        'coming unread',
        function (message: string) {
          let parsedMessage = message.split("!$!");
          // value.emit("coming " + read, socketData.id + "!$!" + socketData.name + "!$!" + message);
          // perbarui list chat pelanggan karena pelanggan dengan ID: customerID mengirim chat baru namun belum dibaca
          // Ini update daftar chat masuk dari pelanggan yang ada di kiri layar dan diberi tahu kalau chat ini belum dibaca
          // karena belum ada yang buka chatnya
          if (daftarLawanBicara.has(parseInt(parsedMessage[0]))) {
            let data = daftarLawanBicara.get(parseInt(parsedMessage[0]));
            data?.setRead(false);
          }
          else {
            let chatSenderData : ChatSenderData = new ChatSenderData(parseInt(parsedMessage[0]), parsedMessage[1], false)
            setDaftarLawanBicara((data) => data.set(parseInt(parsedMessage[0]), chatSenderData));
            setDaftarLawanBicaraArray((data) => [...data, chatSenderData]);
          }
          daftarLawanBicaraArray.sort(function (a : ChatSenderData, b : ChatSenderData) {
            return a.getRead() ? 1 : -1;
          });
        }
      )
  
      chatSocketController.addCallback(
        'coming read',
        function (message: string) {
          let parsedMessage = message.split("!$!");
          // perbarui list chat pelanggan karena pelanggan dengan ID: customerID mengirim chat baru dan telah dibaca
  
          // sama kayak "coming unread" hanya saja sudah dibaca
          if (daftarLawanBicara.has(parseInt(parsedMessage[0]))) {
            let data = daftarLawanBicara.get(parseInt(parsedMessage[0]));
            data?.setRead(true);
          }
          else {
            let chatSenderData : ChatSenderData = new ChatSenderData(parseInt(parsedMessage[0]), parsedMessage[1], true)
            setDaftarLawanBicara((data) => data.set(parseInt(parsedMessage[0]), chatSenderData));
            setDaftarLawanBicaraArray((data) => [...data, chatSenderData]);
          }
          daftarLawanBicaraArray.sort(function (a : ChatSenderData, b : ChatSenderData) {
            return a.getRead() ? 1 : -1;
          });
        }
      )

      return () => {
        chatSocketController.removeCallback("message self read");
        chatSocketController.removeCallback("message self unread");
        chatSocketController.removeCallback("message to");
        chatSocketController.removeCallback("aktif");
        chatSocketController.removeCallback("readall");
        chatSocketController.removeCallback("readed");
        chatSocketController.removeCallback("coming unread");
        chatSocketController.removeCallback("coming read");
      }
    }, [])

    useEffect(() => {
      chatSocketController.read(id)
    }, [id])

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
            {daftarLawanBicaraArray.map((dataLawanBicara : ChatSenderData) => 
              (<Link
                to={`/admin/chat/${dataLawanBicara.getID()}`}
                className={`flex flex-col py-5 px-5 ${
                  location.pathname === `/admin/chat/${dataLawanBicara.getID()}`
                    ? 'bg-dark'
                    : 'hover:bg-dark'
                }`}
                onClick={() => setId(dataLawanBicara.getID())}
              key={dataLawanBicara.getID()}>
                <p className='font-medium text-lg'>{dataLawanBicara.getName()}</p>
                <p className='text-sm text-gray-400'>
                  {dataLawanBicara.getRead() ? "" : "Baru..."}
                </p>
              </Link>)
            )}
          </div>
          <Chat
            id={id}
            chatSocketController={chatSocketController}
            chat={chat}
            setChat={setChat}
            location={location}
            chatMasuk={daftarChat}
          />
        </div>
      </div>
    )
  }
}

export default ChatPage
