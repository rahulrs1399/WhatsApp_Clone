import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AvatarGenerator } from 'random-avatar-generator'
import './SidebarChat.css'
import { doc, collection, onSnapshot, orderBy, query, addDoc } from "firebase/firestore";
import db from './firebase';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';



function SidebarChat( {id, name, addNewChat} ) {

  const [seed, setSeed] = useState("")
  const {roomId} = useParams();
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const [roomName, setRoomName] = useState("");

  const generator = new AvatarGenerator();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateChat = async () => {
    if (roomName) {
      try {
        await addDoc(collection(db, "room"), {
          name: roomName,
        });
        console.log("Document successfully added!");
        handleClose();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

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

  // const createChat = async () => {
  //   const roomName = prompt("Please enter the name for chat room");
  //   if (roomName) {
  //     try {
  //       await addDoc(collection(db, "room"), {
  //         name: roomName,
  //       });
  //       console.log("Document successfully added!");
  //     } catch (e) {
  //       console.error("Error adding document: ", e);
  //     }
  //   }
  // };

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
    // <div onClick={createChat} className='SidebarChat SidebarChat__addNew'>
    //   <h2>Add new Chat</h2>
    // </div>

    <>
      <div onClick={handleClickOpen} className="SidebarChat SidebarChat__addNew">
        <h2>Add new Chat</h2>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a new Chat Room</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Chat Room Name"
            fullWidth
            variant="standard"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreateChat}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default SidebarChat