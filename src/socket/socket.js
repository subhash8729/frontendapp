// socket.js
import { io } from "socket.io-client";

let socket = null;

export const connectSocket = () => {
  if (!socket) {
    socket = io("https://backendapp-xqax.onrender.com/");

    socket.on("connect", () => {
      console.log("Socket connected with ID:", socket.id);
    });
    socket.on("message",(data)=>{
      console.log(data);
    })
  }

  return socket;
};

export const getSocket = () => socket;
