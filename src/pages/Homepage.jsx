import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from "react-router-dom";

const Homepage = () => {
    return (
        <div>
            <Navbar />

            <div className="h-screen w-full bg-gradient-to-br from-zinc-900 to-zinc-700 text-white">
                <div className="h-full w-full pt-10 px-4 flex flex-col items-center">
                    {/* Logo */}
                    <div className="mb-6 animate-bounce rounded-full bg-amber-600 shadow-zinc-700 shadow-lg duration-700">
                        <img
                            src="/images/chatlogo.png"
                            alt="Google Chat Logo"
                            className="w-20  p-4 h-20"
                        />
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-cyan-400 text-transparent bg-clip-text py-3 px-6 rounded-full mb-6 shadow-amber-500 shadow-md">
                        Chat App
                    </h1>

                    {/* Divider */}
                    <div className="w-4/5 bg-gradient-to-r from-pink-500 to-purple-500 h-[2px] rounded-full mb-10"></div>

                    {/* Buttons */}
                    <div className="flex flex-col items-center space-y-5 w-full max-w-sm">
  <Link
    to="/login"
    className="w-full text-center py-3 px-6 font-semibold rounded-full bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl hover:from-emerald-400 hover:to-green-600"
  >
    Login
  </Link>
  <Link
    to="/signup"
    className="w-full text-center py-3 px-6 font-semibold rounded-full bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl hover:from-emerald-400 hover:to-green-600"
  >
    Sign Up
  </Link>
  <Link
    to="/about"
    className="w-full text-center py-3 px-6 font-semibold rounded-full bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl hover:from-emerald-400 hover:to-green-600"
  >
    About Developer
  </Link>
</div>
                </div>
            </div>

        </div>
    )
}

export default Homepage