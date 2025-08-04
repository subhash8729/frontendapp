import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import {io} from "socket.io-client"
// const socket = io("http://localhost:3000")
// socket.on("connect", () => {
//   console.log("user connected", socket.id);
// });

// socket.emit("new_message","hello from the client")


createRoot(document.getElementById('root')).render(
  
    <App />

)
