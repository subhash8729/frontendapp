import { PlusIcon, ChatBubbleOvalLeftEllipsisIcon, UserCircleIcon, UserIcon, ArrowLeftCircleIcon } from '@heroicons/react/16/solid';
import { ChatBubbleBottomCenterIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { connectSocket, getSocket } from '../socket/socket.js'
import ChatContainer from '../components/ChatContainer';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// import {userdata} from '../socket/Data.js';
// import { ContactStore } from '../socket/Data.js';
import { useDatabase } from '../socket/Data.js';
import Loading from '../components/Loading.jsx';





const chat = () => {

    //Destructuring contact zustand
    const {
        data1,
        addUser,
        addMessage
    } = useDatabase();


    //Destructuring contact zustand
    // const {
    //     contacts,
    //     setContacts,
    // } = ContactStore();
    // console.log("contacts are ",contacts);

    //Destructuring userData zustand
    //     const {
    //     username,
    //     messages,
    //     puraData,
    //     setPuraData,
    //     setUsername,
    //     setMessages,
    //     setOnline,
    //     setActive,
    //   } = userdata();


    const [clicked, setClicked] = useState(false); //to display chat container
    const [name, setName] = useState("");
    const [display, setDisplay] = useState(false)
    const [sms, setSms] = useState("");
    const [prop, setProp] = useState([
    ]);
    const [message, setMessage] = useState({
        username: "",
        message: ""
    })
    const [connected, setConnected] = useState(false)
    const [pop, setPop] = useState(false)
    const navigate = useNavigate();
    const [pop_show, setPop_show] = useState(true);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState("");
    const [selected, setSelected] = useState("")
    const [userData, setUserData] = useState([])
    // console.log(user);
    // useEffect(()=>{
    //     console.log(data);
    // },[data])

    useEffect(() => {
        if (connected) {
            const socket = getSocket();
            socket.on("new_message", (data) => {
                // console.log("the new chat data is ",data);
                setProp([data]);
                addMessage(data.from, { "other": data.message })
            })
        }

    }, [connected])





    useEffect(() => {
        const fn = async () => {
            const result = await check();
            if (result) {
                // console.log(result.data);
                setUser(result.data.username)
                connectSocket();
                setConnected(true)
                const socket = getSocket();
                socket.on("connect", () => {
                    toast.success("You are Online")
                    socket.emit("userInfo", {
                        socketId: socket.id,
                        username: result.data.username
                    })

                })

            }
            else {
                console.log(result);
                navigate("/login")
            }
        }
        fn();

    }, [])

    const submit_Chat = (e) => {
        const username = user;
        const message = e.target.message.value;

        socket.emit("message", {
            username,
            message
        })

    }




    const check = async () => {
        if (!localStorage.getItem('token')) {
            console.log("token nhi mila");
            return false;
            navigate("/login");
        }
        // console.log("check fn me aya");
        const result = await checkAuth(localStorage.getItem('token'))
        // console.log('vlaue of result is', result);
        return result;

    }

    const checkAuth = async (token) => {
        try {
            const result = await axios.post("https://backendapp-xqax.onrender.com/check/auth", { token })
            // setUser(result.data.username)
            // console.log(result.data);
            // console.log(result);
            return result;
        }
        catch {
            console.log("else block run huaa");
            return false;
        }
    }

    useEffect(() => {
        console.log("the value of data1 is ", data1);
    }, [data1])


    // POP submit
    const handle_submit = async (e) => {
        e.preventDefault();
        const value = e.target.username.value
        const result = await sendData({ username: value })
        if (result.result == "success") {
            // console.log(user);
            if (result.user == user) {
                toast.info("You can not add yourself")
                setLoading(false)
                // console.log("the data obj is", typeof (data));
                return;
            }


            // setData(prev => ([...prev, result.user]))
            if (result.user in data1) {
                setLoading(false)
                toast.info("can not set same user again")
                return;
            }
            toast.success("User Found")
            setLoading(false)
            addUser(result.user)
        }
        else {
            toast.error("User does not exist")
            setLoading(false)
        }
    }

    const sendData = async (data) => {
        setLoading(true)
        try {
            const response = await axios.post("https://backendapp-xqax.onrender.com/finduser", data)
            return {
                result: "success",
                user: response.data.user
            }
        }
        catch {
            return {
                result: "failed",
                response: "Failed to send the req"
            }
        }
    }

    // useEffect(() => {
    //     const socket = getSocket();

    //     if (socket) {
    //         // const onSms = sms => setSms(sms);
    //         const onMessage = (message) => {
    //             setProp([message])
    //         }
    //         socket.on("sms", onMessage);

    //         // Clean up the listener on unmount
    //         return () => {
    //             socket.off("sms", onMessage);
    //         };
    //     } else {
    //         navigate("/login");
    //     }
    // }, []);


    const showPopup = () => {
        setPop(true)
    }

    // const getData = async () => {
    //     try {
    //         const response = await axios.get("http://localhost:3000/getdata");
    //         setData(response.data);

    //     }
    //     catch {
    //         console.log("could not get data");
    //     }
    // }
    // // toast("success")
    // useEffect(() => {
    //     getData();
    // }, []);

    const showChat = (username) => {
        setName(username);
        setDisplay(true)
        setClicked(true);
        setSelected(username)
    }


    // const socket = getSocket();
    // console.log(socket);
    // socket.on("message",(data)=>{console.log("The data which have been send is --> ",data);})



    return (
        <>
            
                <div className='w-full h-screen text-white bg-zinc-800'>
                    <ToastContainer />

                    {/* POPUP */}
                    <div className={`p-10 fixed top-1/2 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[500px] -translate-y-1/2 z-40 bg-blue-500 rounded-md ${pop ? "block" : "hidden"}`}>

                        <form action="" onSubmit={handle_submit}>
                            <div className='my-2'>Add user</div>
                            <div className='flex gap-3'>
                                <div>
                                    <input type="text" name='username' className='w-[90%] h-[40px] rounded-md bg-zinc-600 pl-5' placeholder='Username' />
                                </div>
                                <button className='bg-green-700 rounded-md flex items-center justify-center w-[70px] h-[40px]'>Add</button>
                                <button type='button' onClick={() => setPop(false)} className='bg-red-900 rounded-md flex items-center justify-center w-[70px] h-[40px]'>Cancel</button>
                            </div>
                        </form>
                    </div>
                    {/* POPUP <--- */}


                    {/* --> logo line */}
                    <div className='w-full h-[50px] items-center text-white font-bold tracking-wide gap-5 px-10 bg-green-500 flex'>
                        <div>
                            <ArrowLeftCircleIcon onClick={() => { setDisplay(false) }} className='w-6 h-6' />
                        </div>
                        <div className=' w-[30px] h-[30px]'>
                            <img className='w-full h-full' src="https://images.seeklogo.com/logo-png/16/2/whatsapp-logo-png_seeklogo-168310.png" alt="whatsapp logo" />
                        </div>
                        <div>Whatsapp</div>
                    </div>
                    {/* logo line <--*/}

                    <div className='flex w-full h-[calc(100%-50px)]'>

                        <div className='h-[calc(100vh-50px)] py-3 w-[45px] rounded-l-2xl space-y-2 bg-zinc-900'>
                            <div className='w-full h-[45px] justify-center p-2 box-border rounded-full flex items-center hover:bg-zinc-500'>
                                <PlusIcon onClick={showPopup} className='w-10 h-10 text-white' />
                            </div>
                            <div className='w-full h-[45px] justify-center p-3 rounded-full box-border flex items-center hover:bg-zinc-500'>
                                <ChatBubbleOvalLeftEllipsisIcon className='w-10 h-10 text-white' />
                            </div>
                            <div className='w-full h-[45px] justify-center p-3 rounded-full box-border flex items-center hover:bg-zinc-500'>
                                <UserCircleIcon className='w-10 h-10 text-white' />
                            </div>

                        </div>
                        <Loading loading={loading} />
                        {/* -->side div having chats */}
                        <div className='w-[calc(100vw-45px)] flex bg-zinc-800 h-[calc(100vh-50px)]'>

                            {/* -->contact list main */}
                            <div className={`w-full md:w-[300px] ${display ? "hidden" : "block"} h-full space-y-2 p-2 overflow-y-auto bg-zinc-700 `}>

                                {
                                    Object.entries(data1).map(([key, value]) => (
                                        <div key={key} onClick={() => { showChat(key) }} className='w-full hover:bg-zinc-600 bg-zinc-500 flex items-center px-2 space-x-2 rounded-md h-[50px]'>
                                            <div className='w-[40px] h-[40px] flex items-center justify-center p-2 rounded-full bg-zinc-800'>
                                                <UserIcon className='w-full h-full' />
                                            </div>
                                            <div> {key} </div>
                                        </div>
                                    ))
                                }

                            </div>
                            {/* contact list main <-- */}

                            <div className={`${display ? "flex" : "hidden"} items-center justify-center w-full h-full`}>
                                {
                                    clicked ? <div className='h-full w-full bg-amber-700'>

                                        <ChatContainer user={user} username1={name} prop={prop} />

                                    </div>
                                        : <ChatBubbleBottomCenterIcon className='h-20 text-blue-600 w-20' />
                                }

                            </div>

                        </div>
                        {/* side div having chats <--- */}

                    </div>


                </div>
            
        </>

    )
}

export default chat