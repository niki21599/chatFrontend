import React, { useEffect, useState } from "react";
import "./ChatSection.css";
import MenuBarChat from "../MenuBarChat/MenuBarChat";
import ChatTextField from "../ChatTextField/ChatTextField";
import Chatroom from "../Chatroom/Chatroom";
import NoChats from "../NoChats/NoChats";
import { getMessages } from "../../apiCalls";
import { getUserDetail } from "../../apiCalls";

export default function ChatSection(props) {
  let [user, setUser] = useState();
  let [messages, setMessages] = useState();

  useEffect(() => {
    if (props.chat) {
      let user_id =
        props.user_id === props.chat.fields.user_1
          ? props.chat.fields.user_2
          : props.chat.fields.user_1;

      getUserDetail([user_id]).then((result) => {
        let user = result[0];
        setUser(user);
      });
    }
  }, [props.chat]);

  useEffect(() => {
    if (props.chat) {
      getMessages(props.chat.pk).then((result) => setMessages(result));
    }
  }, [props.chat]);

  return (
    <div className="chatSection">
      {props.chat ? (
        <div>
          <MenuBarChat user={user} />
          <Chatroom messages={messages} user_id={props.user_id} />
          <ChatTextField
            chat_id={props.chat.pk}
            setMessages={setMessages}
            messages={messages}
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
