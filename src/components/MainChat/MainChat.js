import React, { useState, useEffect } from "react";
import "./MainChat.css";
import ChatSection from "../ChatSection/ChatSection";
import ContactSection from "../ContactSection/ContactSection";
import { Navigate } from "react-router-dom";

import { getChats, getUserId } from "../../apiCalls";

export default function MainChat(props) {
  let getSavedChat = () => {
    let chat = localStorage.getItem("openChat");
    if (chat) {
      let chat_json = JSON.parse(chat);
      return chat_json;
    } else {
      return;
    }
  };

  let getSavedUserId = () => {
    let user_id = localStorage.getItem("user_id");
    if (user_id) {
      let user_id_json = JSON.parse(user_id);
      return user_id_json;
    } else {
      return;
    }
  };

  let [chats, setChats] = useState([]);
  let [openChat, setOpenChat] = useState(getSavedChat);

  let [user_id, setUser_id] = useState(getSavedUserId);

  useEffect(() => {
    getChats().then((result) => {
      setChats(result);
    });
  }, []);

  useEffect(() => {
    getUserId().then((result) => {
      setUser_id(result);
      localStorage.setItem("user_id", JSON.stringify(result));
    });
  }, []);

  let openChatWithId = (chat_id) => {
    let [chat] = chats.filter((chat) => chat.pk === chat_id);

    setOpenChat(chat);
    localStorage.setItem("openChat", JSON.stringify(chat));
  };

  let openNewChat = (chat) => {
    setOpenChat(chat);
    localStorage.setItem("openChat", JSON.stringify(chat));
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
            openNewChat={openNewChat}
            logout={props.logout}
            user_id={user_id}
            addChat={addChat}
          ></ContactSection>
          <ChatSection chat={openChat} user_id={user_id}></ChatSection>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
}
