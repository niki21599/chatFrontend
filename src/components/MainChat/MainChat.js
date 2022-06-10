import React, { useState, useEffect } from "react";
import "./MainChat.css";
import ChatSection from "../ChatSection/ChatSection";
import ContactSection from "../ContactSection/ContactSection";
import Chatroom from "../Chatroom/Chatroom";
import { Navigate } from "react-router-dom";

import { getChats, getMessages, getUserId } from "../../apiCalls";

export default function MainChat(props) {
  let [chats, setChats] = useState([]);
  let [messages, setMessages] = useState();
  let [user, setUser] = useState();
  let [chat_id, setChat_id] = useState();
  let [user_id, setUser_id] = useState();

  useEffect(() => {
    getChats().then((result) => {
      setChats(result);
    });
  }, []);

  useEffect(() => {
    getUserId().then((result) => {
      setUser_id(result);
    });
  }, []);

  let openChatWithId = (chat_id) => {
    getMessages(chat_id).then((result) => {
      setChat_id(chat_id);
      setMessages(result);
    });
  };
  let addChat = (newChat) => {
    const newChats = [newChat, ...chats];
    setChats(newChats);
  };

  return (
    <div>
      {props.loggedIn ? (
        <div className="wholeContainer">
          <ContactSection
            chats={chats}
            openChatWithId={openChatWithId}
            setUser={setUser}
            messages={messages}
            logout={props.logout}
            user_id={user_id}
            addChat={addChat}
          ></ContactSection>
          <ChatSection
            messages={messages}
            user={user}
            chat_id={chat_id}
            setMessages={setMessages}
            chat={chats.filter((chat) => chat.pk == chat_id)}
            user_id={user_id}
          ></ChatSection>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
}
