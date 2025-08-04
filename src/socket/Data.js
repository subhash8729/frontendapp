import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer'

export const userdata = create((set) => ({
  username: "",
  messages: [
  ],
  // changed from "" to [] assuming it's a list
  active: false,
  online: false,
  puraData: [],

  setUsername: (username) => set({ username }),
  setMessages: (newMessage) => {
    const key = newMessage.me ? "me" : "other"
    set((state) => ({
      messages: [...state.messages, { [key]: newMessage.messages }]
    }))
  },
  //new.me? --> me:new.message : other: other.message

  setActive: (torf) => set({ active: torf }),
  setOnline: (torf) => set({ online: torf }),
  setPuraData: (userdata) => set((state) => ({
    puraData: [...state.puraData, userdata]
  }))
}));



//setDataOfuser ==> (userdata)=>{
//   usedata as argument --> {user1, user2 ,user3}
// 
// }

//access-->
//  userdata.user1 --> pura data
//  userdata.user1.username --> username
//  userdata.user1.isOnline --> false

export const useDatabase = create(immer((set) => ({
  data1: {},

  addUser: (username) =>
    set((state) => {
      if (!state.data1[username]) {
        state.data1[username] = {
          username,
          messages: []
        };
      }
    }),

  addMessage: (username, message) =>
    set((state) => {
      if (!state.data1[username]) {
        state.data1[username] = { username, messages: [] };
      }
      state.data1[username].messages.push(message);
    })
})));


