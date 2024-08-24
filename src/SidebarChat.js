import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AvatarGenerator } from 'random-avatar-generator'
import './SidebarChat.css'
import { doc, collection, onSnapshot, orderBy, query, addDoc } from "firebase/firestore";
import db from './firebase';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";


function SidebarChat( {id, name, addNewChat} ) {

  const [seed, setSeed] = useState("")
  const {roomId} = useParams();
  const [messages, setMessages] = useState([]);

  const generator = new AvatarGenerator();

  useEffect(() => {
    if (id) {
  
      // Listening to messages collection changes
      const messagesCollectionRef = collection(db, "room", id, "messages");
      const messagesQuery = query(messagesCollectionRef, orderBy("timestamp", "desc"));
      
      const unsubscribeMessages = onSnapshot(messagesQuery, (snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
       // Cleanup on unmount
    return () => {
      unsubscribeMessages();
    };
  }
}, [id]);

  useEffect(() => {
    setSeed(generator.generateRandomAvatar());
  }, []);

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
    <Link to={`/room/${id}`}>
      <div className='SidebarChat'>      
      <Avatar src={seed}/>
      <div className='SidebarChat__info'>
        <h2>{name}</h2>
        <p>{messages[0]?.message}</p>
      </div>
    </div>
    </Link>
  ) : (
    <div onClick={createChat} className='SidebarChat'>
      <h2>Add new Chat</h2>
    </div>
  )
}

export default SidebarChat