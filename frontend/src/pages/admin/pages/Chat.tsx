import { Dispatch, SetStateAction } from 'react'
import { ChatSocketController } from '../../../util/ChatSocketController'
import { useLocation } from 'react-router-dom'

interface ChatProps {
  chatSocketController: ChatSocketController
  chat: string
  setChat: Dispatch<SetStateAction<string>>
  location: ReturnType<typeof useLocation>
  id: number
  chatMasuk: string[]
}

const Chat = ({
  chatSocketController,
  chat,
  setChat,
  location,
  id,
  chatMasuk,
}: ChatProps) => {
  if (location.pathname == '/admin/chat/0') {
    return (
      <div className='w-3/4 flex items-center justify-center h-full'>
        <p className='text-xl'>Pilih chat untuk memulai</p>
      </div>
    )
  }

  return (
    <div className='w-3/4 flex flex-col h-full'>
      <div className='flex flex-col py-5 px-10 border-b border-dark'>
        <p className='font-bold text-xl'>Sun Jaya Komputer</p>
        <p id='aktif'>Aktif</p>
      </div>
      <div id='chats' className='flex items-center justify-center'>
        {chatMasuk.map((chat, index) => (
          <div key={index}>{chat}</div>
        ))}
      </div>
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
  )
}

export default Chat
