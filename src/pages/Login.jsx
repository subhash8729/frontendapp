import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify'
import { io } from "socket.io-client"
import { connectSocket } from '../socket/socket.js'
import Loading from '../components/Loading.jsx'

const Login = () => {
    // useEffect(()=>{
    //     localStorage.clear();
    // },[])
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })
    const navigate = useNavigate();
    const handle_change = (e) => {
            setFormData(prev=>(
                {
                    ...prev,
                [e.target.name]: e.target.value,
                }
            ))
        }
    const handle_submit = async(e) => {
        setLoading(true)
        e.preventDefault();
        console.log(formData);
        const result = await axios.post("https://backendapp-xqax.onrender.com/login",formData).catch((err)=>{
            setLoading(false)
            toast.error("login nhi ho paya");
        })
        if(result){
            setLoading(false)
            localStorage.setItem("token",result.data.token);
            // console.log("1. navigate to chat");
            navigate("/chat")

        }
    }


    return (
        <div>
            <form action="" onChange={handle_change} onSubmit={handle_submit}>

                <Navbar />
                <ToastContainer />
                <Loading loading={loading} />
                <div id='input-content' className='w-full h-screen font-satoshi flex items-center p-10 justify-between bg-[#222222]'>
                    <div id='input-div' className='w-1/2 flex items-center h-full' >


                        <div className='w-full'>


                            <div className='w-[200px] h-[50px] font-serif text-3xl flex items-center justify-center bg-amber-500 rounded-4xl m-auto'> <p>Login</p> </div>

                            <div className='my-18 flex items-center justify-center'>
                                <input type="text" name='username' className='pl-6 inputs  bg-[#989bd4] w-[70%] h-14 rounded-4xl' placeholder='Username' />
                            </div>
                            <div className='my-8 flex items-center justify-center'>
                                <input type="text" name='password' className='pl-6 inputs bg-[#989bd4] w-[70%] h-14 rounded-4xl' placeholder='Password' />
                            </div>
                            <div className='my-8 flex items-center justify-center'>
                                <button className='px-4 py-2 rounded-4xl bg-[#1DCD9F]'>Submit</button>
                            </div>

                        </div>


                    </div>
                    <div className='svg w-1/2 h-full flex items-center rounded-full' >

                        <div className='w-full h-3/5 bg-[#4965316e] rounded-full '>

                            <img className='w-full h-full' src="/images/login1.svg" alt="login" />
                        </div>
                    </div>
                </div>
            </form>
        </div >
    )
}

export default Login