import React, { useEffect } from 'react'
import { ChatBubbleLeftRightIcon, PaperAirplaneIcon, UserIcon } from '@heroicons/react/16/solid'
import { useState } from 'react'
import axios from 'axios'
import { getSocket } from '../socket/socket'
import { ToastContainer, toast } from 'react-toastify'
import { userdata } from '../socket/Data'
import { useDatabase } from '../socket/Data'


const ChatContainer = ({ username1, prop, user, selected }) => {


    const {
        data1,
        addUser,
        addMessage
    } = useDatabase();

    // console.log(username1);
    const {
        username,
        messages,
        puraData,
        setPuraData,
        setUsername,
        setMessages,
        setOnline,
        setActive,
    } = userdata();

    const [chatData, setChatData] = useState([])
    const [input, setInput] = useState("")
    const [x, setX] = useState(false);
    useEffect(() => {
        prop.forEach((value) => {
            setChatData(prev => ([
                ...prev,
                { "other": value.message }
            ]))
        })
        
        // prop.forEach((value)=>console.log(value))
    }, [prop])

    useEffect(() => { console.log(chatData); }, [chatData])

    //     setChatData(prev=>({
    //         prop,


    // }))
    useState(()=>{
        console.log("the updated prop is ",prop);
    },[prop])

    useEffect(() => {
        setTimeout(() => {
            setX(false)
        }, 300);
    }, [x])


    const submitChat = async (e) => {
        e.preventDefault();
        // const response = await axios.post("http://localhost:3000/chat", chatData);
        if (x == true) { console.log("return kiya or x= ", x); return }
        else {
            const socket = getSocket();
            // console.log("chat data that is going to be emit is --> ",chatData.message);
            const from = user;
            const message = input;
            console.log("emit krne ki bharpoor koshish");
            socket.emit("message", {
                from: user,
                to: username1,
                message
            })
            // console.log("Message send succesfully --",input);
            setX(true)
            setChatData(prev => ([
                ...prev,


                { "me": input }

            ]))
            setMessages({ "me": input })
            addMessage(username1,{"me":input})

            setInput("")
        }
    }
    // useEffect(()=>{
    // console.log(socket);
    // },[])

    // console.log("this is the socket",socket);

    return (
        <>
            <ToastContainer />

            <div className='w-full h-[50px] flex px-5 items-center gap-4 bg-zinc-700'>
                <div className='rounded-full w-[40px] h-[40px] bg-zinc-800 p-2 flex items-center justify-center'>
                    <UserIcon className='w-full h-full' />
                </div>
                <div> {username1}</div>
            </div>

            <div className='h-[calc(100%-50px)] w-full'>


                <div className='w-full bg-red-300 flex justify-center items-center h-[calc(100%-50px)]'>
                    <div className="w-full h-full bg-zinc-800 p-4 overflow-auto">

                        {/* ---> Chat Interface*/}

                        <div className="w-full h-full text-black bg-zinc-800 p-4 overflow-auto">
  {chatData.length !== 0 ? (
    data1[username1]?.messages?.map((messageObj, index) => {
      if (messageObj.other) {
        return (
          <div key={index} className="w-full h-auto my-4">
            <div className="bg-yellow-200 rounded-md px-3 py-2 inline-block">{messageObj.other}</div>
          </div>
        );
      } else if (messageObj.me) {
        return (
          <div key={index} className="flex justify-end w-full h-auto my-4">
            <div className="bg-blue-400 rounded-md px-3 py-2 inline-block">{messageObj.me}</div>
          </div>
        );
      } else {
        return null;
      }
    })
  ) : (
    <div className="w-full h-full flex justify-center items-center text-white">
      <ChatBubbleLeftRightIcon className="w-20 h-20" />
    </div>
  )}
</div>



                        {/* Chat Interface <---*/}
                    </div>
                </div>

                {/* ---> input and submit */}
                <form action="" onSubmit={submitChat}>

                    <div className='w-full h-[50px] flex bg-red-900'>
                        <div className='w-[calc(100%-70px)] h-full text-black bg-white'>
                            <input type="text" name='message' placeholder='send a message' value={input} onChange={(e) => { setInput(e.target.value) }} className='w-full h-full pl-4 rounded-l-md' />
                        </div>
                        <button className='h-full bg-zinc-700 p-2 w-[70px]'>
                            <PaperAirplaneIcon className='w-full h-full' />
                        </button>
                    </div>

                </form>
                {/* input and submit <--- */}

            </div>
        </>
    )
}

export default ChatContainer