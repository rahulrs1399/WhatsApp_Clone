import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AvatarGenerator } from 'random-avatar-generator'
import './SidebarChat.css'
import { collection, addDoc } from "firebase/firestore";
import db from './firebase';

function SidebarChat( {id, name, addNewChat} ) {

  const [seed, setSeed] = useState("")

  const generator = new AvatarGenerator();

  useEffect(() => {
    setSeed(generator.generateRandomAvatar());
  }, [name]);

  const createChat = async () => {
    const roomName = prompt("Please enter the name for chat room");
    if (roomName) {
      try {
        await addDoc(collection(db, "room"), {
          name: roomName,
        });
        console.log("Document successfully added!");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  return !addNewChat ? (
    <div className='SidebarChat'>      
      <Avatar src={seed}/>
      <div className='SidebarChat__info'>
        <h2>{name}</h2>
        <p>Last message....</p>
      </div>
    </div>
  ) : (
    <div onClick={createChat} className='SidebarChat'>
      <h2>Add new Chat</h2>
    </div>
  )
}

export default SidebarChat