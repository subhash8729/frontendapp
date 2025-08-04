import { create } from "zustand";


const ContactStore = create((set)=>({

    contacts:[],
    setContacts:(contact)=>(
        set((state)=>({
        contacts:[...state.contacts, contact ]
    }))
    )
}))

export  {ContactStore}