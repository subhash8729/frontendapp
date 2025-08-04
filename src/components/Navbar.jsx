import React from 'react'
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <div>
      <div className='w-full h-24 bg-gray-800 text-white flex items-center justify-between space-x-4 px-7'>
        <div className='w-[220px] h-full flex items-center space-x-4' >
          <div className='w-14 h-14 flex items-center justify-center overflow-hidden rounded-full'>
            <img className='block p-1 w-14 h-14' src="/images/chatlogo.png" alt="logo" />
          </div>
          <div className='text-2xl bg-blue-500 rounded-4xl px-4 py-2 font-bold'>Chat App</div>
        </div>
        <div id='second-content' className='w-3/6 h-full flex text-[15px] font-bold tracking-wider justify-around items-center'>
          <Link to="/login" className='text-white rounded-4xl font-satoshi px-6 py-3 hover:text-white hover:bg-[#545e5985]'>Log in</Link>
          <Link to="/signup" className='text-white  rounded-4xl font-satoshi px-6 py-3 hover:text-white hover:bg-[#545e5985]'>Sign Up</Link>
          <Link to="/about" className='text-white  rounded-4xl font-satoshi px-6 py-3 hover:text-white hover:bg-[#545e5985]'>About Dev.</Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar