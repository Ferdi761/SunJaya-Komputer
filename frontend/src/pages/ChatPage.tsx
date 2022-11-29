import React from 'react'
import { io } from 'socket.io-client'
import { ChatSocketController } from '../util/ChatSocketController';

const chatPort = 8000;

const chatSocketController : ChatSocketController = new ChatSocketController(io(`http://localhost:${chatPort}`).connect())


const ChatPage = () => {

  chatSocketController.addCallback("message self read", function(message : string) {
    let newChat = document.createElement("p");
    newChat.innerHTML = "self: " + message;
    document.getElementById("chats")?.appendChild(newChat);
  });

  chatSocketController.addCallback("message self unread", function(message : string) {
    let newChat = document.createElement("p");
    newChat.innerHTML = "self: " + message;
    document.getElementById("chats")?.appendChild(newChat);
  });

  chatSocketController.addCallback("message to", function(message : string) {
    let newChat = document.createElement("p");
    newChat.innerHTML = "to: " + message;
    document.getElementById("chats")?.appendChild(newChat);
  });

  return (
    <div className='bg-primary h-screen text-white flex justify-center'>
      <div className='w-2/3 bg-black my-10 border border-dark'>
        <div className="flex flex-col h-full">
          <div className='flex flex-col py-5 px-10 border-b border-dark'>
            <p className='font-bold text-2xl'>Sun Jaya Komputer</p>
            <p>Aktif</p>


          </div>
          <div id='chats' className='flex-grow'>

          </div>
          
          <input
            className='focus:ring-2 focus:ring-black focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-primary rounded-md py-2 pl-5 ring-1 ring-slate-200 shadow-sm bg-formInput'
            type='text'
            id='id-input'
            onKeyDown={function(e) {
              if (e.key == "Enter") {
                let id = (document.getElementById("id-input") as HTMLInputElement).value;
                chatSocketController.init(parseInt(id));
                console.log(chatSocketController);
              }
            }}
          />
          <input
            className='focus:ring-2 focus:ring-black focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-primary rounded-md py-2 pl-5 ring-1 ring-slate-200 shadow-sm bg-formInput'
            type='text'
            id='auth-input'
            onKeyDown={function(e) {
              if (e.key == "Enter") {
                let auth = (document.getElementById("auth-input") as HTMLInputElement).value;
                chatSocketController.auth(auth);
                console.log(chatSocketController);
              }
            }}
          />
          <input
            className='focus:ring-2 focus:ring-black focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-primary rounded-md py-2 pl-5 ring-1 ring-slate-200 shadow-sm bg-formInput'
            type='text'
            id='read-input'
            onKeyDown={function(e) {
              if (e.key == "Enter") {
                let read = (document.getElementById("read-input") as HTMLInputElement).value;
                chatSocketController.read(parseInt(read));
                console.log(chatSocketController);
              }
            }}
          />
          <input
            className='focus:ring-2 focus:ring-black focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-primary rounded-md py-2 pl-5 ring-1 ring-slate-200 shadow-sm bg-formInput'
            type='text'
            id='chat-input'
            onKeyDown={function(e) {
              if (e.key == "Enter") {
                let chatText = (document.getElementById("chat-input") as HTMLInputElement).value;
                (document.getElementById("chat-input") as HTMLInputElement).value = "";
                chatSocketController.sendMessage(chatText);
                console.log(chatSocketController);
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ChatPage
