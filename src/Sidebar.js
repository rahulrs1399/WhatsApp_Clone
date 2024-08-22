import {
  Chat,
  DonutLarge,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import db from "./firebase";

import {collection, getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth } from './firebase';
import {useUser} from "./UserContext"

function Sidebar() {
  const [{ user }] = useUser();
  const [rooms, setRooms] = useState([]);

  console.log(user)

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "room"));
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
        // console.log(doc.data);
      });
      setRooms(items);
    };

    fetchData();
  }, []);

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  }


  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL}/>
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <div onClick={() => handleSignOut()}>
          <IconButton>
            <MoreVert />
          </IconButton>
          </div>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat/>
        {
          rooms.map((room, index) => (
            <SidebarChat key={room.id} id={room.id} name={room.name} />
          ))
        }
      </div>
    </div>
  );
}

export default Sidebar;
