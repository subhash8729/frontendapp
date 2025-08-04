import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import About from './pages/About'
import Chat from './pages/chat'
import Practice from './pages/Practice'
import Login from './pages/Login'


const App = () => {
  return (
    <div >
      <BrowserRouter>

         <Routes>

          
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/about' element={<About />} />
          <Route path='/' element={<About />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/practice' element = { <Practice /> } />

         </Routes>

         </BrowserRouter>              
    </div>
  )
}

export default App