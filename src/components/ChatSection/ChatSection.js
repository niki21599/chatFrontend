import React from "react";
import "./ChatSection.css";
import MenuBarChat from "../MenuBarChat/MenuBarChat";
import ChatTextField from "../ChatTextField/ChatTextField";
import Chatroom from "../Chatroom/Chatroom";
import NoChats from "../NoChats/NoChats";

export default function ChatSection(props) {
  return (
    <div className="chatSection">
      {props.messages ? (
        <div>
          <MenuBarChat user={props.user} />
          <Chatroom messages={props.messages} user_id={props.user_id} />
          <ChatTextField
            chat_id={props.chat_id}
            setMessages={props.setMessages}
            messages={props.messages}
          />
        </div>
      ) : (
        <div>
          <NoChats />
        </div>
      )}
    </div>
  );
}
