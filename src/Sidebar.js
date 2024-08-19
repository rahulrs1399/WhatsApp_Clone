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
import analytics from "./firebase";
import {getFirestore, collection, getDocs } from "firebase/firestore";

function Sidebar() {

    const [data, setData] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        
        const querySnapshot = await getDocs(collection(db, 'your-collection'));
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        setData(items);
      };
  
      fetchData();
    }, []);

  return (
    <div className="App">
      <h1>Firestore Data</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
}

//   return (
//     <div className="sidebar">
//       <div className="sidebar__header">
//         <Avatar />
//         <div className="sidebar__headerRight">
//           <IconButton>
//             <DonutLarge />
//           </IconButton>
//           <IconButton>
//             <Chat />
//           </IconButton>
//           <IconButton>
//             <MoreVert />
//           </IconButton>
//         </div>
//       </div>
//       <div className="sidebar__search">
//         <div className="sidebar__searchContainer">
//           <SearchOutlined />
//           <input placeholder="Search or start new chat" type="text" />
//         </div>
//       </div>
//       <div className="sidebar__chats">
//         <SidebarChat addNewChat/>
//         {
//           rooms.map((room, index) => (
//             <SidebarChat key={room.id} id={index} name={room} />
//           ))
//         }
//       </div>
//     </div>
//   );
// }

export default Sidebar;
