import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { toast,ToastContainer } from 'react-toastify'
import Loading from '../components/Loading'

const Signup = () => {
  const [clicked, setClicked] = useState(false);
  const formRef = useRef(null);
  const [loading,setLoading] = useState(false)


  // const [response, setResponse] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNo: '',
    username: '',
    password: ''
  });

  function validateSignup(name, email, mobile) {
    // Trim inputs
    name = name.trim();
    email = email.trim();
    mobile = mobile.trim();

    // Name Check
    if (name.length < 4) {
      return "Enter a valid name";
    }

    // Email Check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return "Invalid email format";
    }

    // Mobile Number Check
    const mobilePattern = /^\d{10}$/;
    if (!mobilePattern.test(mobile)) {
      return "Mobile number must be 10 digits";
    }

    return 1; // ✅ All checks passed
  }

    const handle_key = (e)=>{
      if(clicked==1) return;
      else{
        if(e.key =="Enter") e.preventDefault();
      }
    }

  const change_position = async() => {

    // const response = await axios.post("url",formData)
    const result = validateSignup(formData.fullName,formData.email,formData.mobileNo);
    if(result !=1){
      toast.error(result)
      return;
    }
    else{
    setClicked(prev => !prev);
    }
  }

   
// setFormData((prev)=>{
//     return {
//       ...prev,
//       [e.target.name]: e.target.value
//     }
// })

  const submit_form = async(e)=>{
    setLoading(true)
    e.preventDefault();
      console.log("form data which has been send is ",formData);
      const response = await axios.post("https://backendapp-xqax.onrender.com/signup",formData).catch((err)=>{
        console.log("error is --> ",err);
        setLoading(false)
        toast.error(err.response.data.message)
      })
      
      if(response){
        setLoading(false)
        toast.success("SignUp successful")
      }

  }

    const handle_change = async(e) => {
    e.preventDefault();
    setFormData((prev)=>{
    return {
      ...prev,
      [e.target.name]: e.target.value
    }
})
  }

  // console.log(submitForm(data));




  return (
    <div>   
      <Navbar />
      <ToastContainer />
      <Loading loading={loading} />
      <div>
        <form action="" onKeyDown={handle_key} onSubmit={submit_form} onChange={handle_change}>
          <div id='input-content' className='w-full h-screen font-satoshi flex items-center p-10 justify-between bg-[#222222]'>

            <div id='input-div' className='w-1/2 flex items-center overflow-hidden h-full' >

              <div className={`w-full flex-shrink-0 transform transition-transform duration-500 ${!clicked ? "-translate-x-[0%]" : "-translate-x-[100%]"}`}>


                <div className='w-[200px] h-[50px]   font-serif text-3xl text-white flex items-center justify-center bg-amber-500 rounded-4xl m-auto'> <p>Sign Up</p> </div>




                <div className='my-18 flex items-center justify-center'>
                  <input type="text" className='pl-6 inputs  bg-[#989bd4] w-[70%] h-14 rounded-4xl' name='fullName' placeholder='Full name' />
                </div>
                <div className='my-18 flex items-center justify-center'>
                  <input type="text" className='pl-6 inputs  bg-[#989bd4] w-[70%] h-14 rounded-4xl' name='email' placeholder='Email adress' />
                </div>
                <div className='my-8 flex items-center justify-center'>
                  <input type="text" className='pl-6  inputs bg-[#989bd4] w-[70%] h-14 rounded-4xl' name='mobileNo' placeholder='Mobile no.' />
                </div>
                <div className='my-8 flex items-center justify-center'>
                  <button onClick={change_position} type='button' className='px-6 py-2 rounded-4xl bg-[#1DCD9F]'>Next</button>



                </div>
              </div>
              <div className={`w-full flex-shrink-0 transform transition-transform duration-500 ${clicked ? "-translate-x-[100%]" : "translate-x-0"} `}>


                <div className='w-3/4 h-[50px] text-center  font-serif md:text-2xl text-lg text-white flex items-center justify-center bg-amber-500 rounded-3xl m-auto'>  <span>Create Credentials</span> </div>

                <div className='my-18 flex items-center justify-center'>
                  <input type="text" className='pl-6 inputs  bg-[#989bd4] w-[70%] h-14 rounded-4xl' name='username' placeholder='Username' />
                </div>
                <div className='my-18 flex items-center justify-center'>
                  <input type="text" className='pl-6 inputs  bg-[#989bd4] w-[70%] h-14 rounded-4xl' name='password' placeholder='Password' />
                </div>
                <div className='my-8 flex items-center justify-around'>
                  <button type='button' onClick={change_position} className='px-6 py-2 rounded-4xl bg-[#1DCD9F]'>Back</button>
                  <button type='submit' className='px-6 py-2 rounded-4xl bg-[#1DCD9F]'>Submit</button>


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
      </div>

    </div>
  )
}

export default Signup