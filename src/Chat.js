import { Avatar, IconButton, Input } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { AvatarGenerator } from "random-avatar-generator";
import "./Chat.css";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOffOutlined,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import {
  addDoc,
  doc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import db from "./firebase";
import { useUser } from "./UserContext";

function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }] = useUser();

  const generator = new AvatarGenerator();

  // console.log(roomId);
  useEffect(() => {
    if (roomId) {
      const roomDocRef = doc(db, "room", roomId);

      // Log roomId and check its validity
      // console.log("Fetching data for roomId:", roomId);

      // Fetch all room IDs to ensure the room exists
      // getDocs(collection(db, "room")).then((snapshot) => {
      //   const roomIds = snapshot.docs.map(doc => doc.id);
      //   console.log("Available Room IDs:", roomIds);

      //   if (!roomIds.includes(roomId)) {
      //     console.error(`Room ID ${roomId} does not exist.`);
      //   }
      // });

      // Listening to room name changes
      const unsubscribeRoomName = onSnapshot(roomDocRef, (snapshot) => {
        if (snapshot.exists()) {
          const roomData = snapshot.data();
          console.log("Room Data:", roomData); // Debug log
          setRoomName(roomData.name);
        } else {
          console.log("No such room!");
        }
      });
      // console.log(roomName)

      // Listening to messages collection changes
      const messagesCollectionRef = collection(db, "room", roomId, "messages");
      const messagesQuery = query(
        messagesCollectionRef,
        orderBy("timestamp", "asc")
      );

      const unsubscribeMessages = onSnapshot(messagesQuery, (snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });

      // Cleanup on unmount
      return () => {
        unsubscribeRoomName();
        unsubscribeMessages();
      };
    }
  }, [roomId, db]);

  useEffect(() => {
    setSeed(generator.generateRandomAvatar());
  }, [roomId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    // console.log("You typed:", input);
    await addDoc(collection(db, "room", roomId, "messages"), {
      message: input,
      name: user.displayName,
      timestamp: serverTimestamp(), // Correct usage for Firebase v9
    });

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={seed} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            Last seen at{" "}
            {messages.length > 0
              ? (() => {
                  const lastMessageTime =
                    messages[messages.length - 1]?.timestamp?.toDate();
                  const now = new Date();
                  const differenceInMs = now - lastMessageTime;

                  const minutes = Math.floor(differenceInMs / 60000);
                  const hours = Math.floor(minutes / 60);
                  const remainingMinutes = minutes % 60;

                  if (hours > 0) {
                    return `${hours} hr ${remainingMinutes} min ago`;
                  } else {
                    return `${minutes} min ago`;
                  }
                })()
              : "No messages yet"}
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOffOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message, index) => (
          <p
            key={index}
            className={`chat__message ${
              message.name === user.displayName && "chat__receiver"
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toLocaleString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            type="text"
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="Submit" onClick={sendMessage}>
            Send message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default Chat;
