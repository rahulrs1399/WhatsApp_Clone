import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AvatarGenerator } from 'random-avatar-generator'
import './SidebarChat.css'

function SidebarChat( {addNewChat} ) {

  const [seed, setSeed] = useState("")

  const generator = new AvatarGenerator();

  useEffect(() => {
    setSeed(generator.generateRandomAvatar());
  }, []);

  const createChat = () => {
    const roonName = prompt("Please enter the name for chat");
    if(roonName){

    }
  };

  return !addNewChat ? (
    <div className='SidebarChat'>
      {/* Create dynamic image, should be random image for every other image */}
      
      <Avatar src={seed}/>
      <div className='SidebarChat__info'>
        <h2>Room name</h2>
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