import { Avatar, IconButton, Input } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { AvatarGenerator } from "random-avatar-generator";
import "./Chat.css";
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOffOutlined } from "@mui/icons-material";

function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");

  const generator = new AvatarGenerator();

  useEffect(() => {
    setSeed(generator.generateRandomAvatar());
  }, []);

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={seed} />
        <div className="chat__headerInfo">
          <h3>Room name</h3>
          <p>Last seen at ...</p>
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
        <p className={`chat__message ${true && "chat__receiver"}`}>
          <span className="chat__name">Rahul RS</span>
          Hey Guys
          <span className="chat__timestamp">11:40pm</span>
        </p>
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
            <input type="text" placeholder="Type a message"value={input} onChange={(e) => setInput(e.target.value)}/>
            <button type="Submit">Send message</button>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default Chat;
