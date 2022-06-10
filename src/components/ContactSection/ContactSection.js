import React from "react";
import "./ContactSection.css";
import MenuBarContact from "../MenuBar/MenuBarContact";
import SearchBar from "../SearchBar/SearchBar";
import ContactList from "../ContactList/ContactList";

export default function ContactSection(props) {
  let [searchTerm, setSearchTerm] = React.useState("");
  let search = (query) => {
    console.log(query);
    setSearchTerm(query);
  };

  return (
    <div className="contactSection">
      {" "}
      <MenuBarContact
        logout={props.logout}
        chats={props.chats}
        addChat={props.addChat}
      />
      <SearchBar search={search} />
      <ContactList
        chats={props.chats}
        openChatWithId={props.openChatWithId}
        setUser={props.setUser}
        messages={props.messages}
        searchTerm={searchTerm}
        user_id={props.user_id}
      />
    </div>
  );
}
