import React, { useEffect, useState } from "react";
import "./ContactList.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { getUserDetail } from "../../apiCalls";
import { getLastMessages } from "../../apiCalls";
import { lime } from "@mui/material/colors";

export default function ContactList(props) {
  let openChat = (pk) => {
    props.openChatWithId(pk);
  };

  let [users, setUsers] = useState([]);
  let [messages, setMessages] = useState([]);

  useEffect(() => {
    let user_ids = [];
    let chat_ids = [];
    props.chats.forEach((chat) => {
      let user_id = getPkOfOtherUser(chat.fields.user_1, chat.fields.user_2);
      user_ids.push(user_id);
      let chat_id = chat.pk;
      chat_ids.push(chat_id);
    });
    if (user_ids.length > 0) {
      getUserDetail(user_ids).then((result) => {
        setUsers(result);
      });
    }
    if (chat_ids.length > 0) {
      getLastMessages(chat_ids).then((result) => {
        setMessages(result);
      });
    }
  }, [props.chats, props.messages]);

  let getPkOfOtherUser = (user_1, user_2) => {
    //Somehow get the user_id

    if (user_2 == props.user_id) {
      return user_1;
    } else {
      return user_2;
    }
  };

  let getUsername = (pk) => {
    let [user] = users.filter((user) => user.pk == pk);
    if (user) {
      let first_name = user.fields.first_name;
      let last_name = user.fields.last_name;
      return first_name + " " + last_name;
    } else {
      return "";
    }
  };
  let getUser = (pk) => {
    console.log("Getting the User with pk: ", pk);
    let [user] = users.filter((user) => user.pk == pk);
    console.log("the user", user);
    if (user) {
      return user;
    } else {
      return {};
    }
  };
  let getLastMessageFrom = (chat_id) => {
    let [message] = messages.filter(
      (message) => message.fields.chat == chat_id
    );
    if (message) {
      return message.fields.text;
    } else {
      return "";
    }
  };
  function stringAvatar(name) {
    if (name) {
      return {
        sx: { width: 56, height: 56, bgcolor: lime[400] },
        children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
      };
    } else {
      return;
    }
  }

  return (
    <div
      style={{
        position: "absolute",
        top: "108px",
        left: "0",
        maxWidth: "30vw",
        minWidth: "300px",
        width: "100%",
        height: "calc( 100vh - 108px)",
        overflowY: "auto",
      }}
    >
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          cursor: "pointer",
        }}
      >
        {props.chats
          .filter((chat) => {
            let name = getUsername(
              getPkOfOtherUser(chat.fields.user_1, chat.fields.user_2)
            );
            let term = props.searchTerm.toLowerCase();
            return name.toLowerCase().includes(term);
          })
          .map((chat) => {
            return (
              <div key={chat.pk}>
                <ListItem
                  alignItems="flex-start"
                  onClick={() => {
                    openChat(chat.pk);
                    props.setUser(
                      getUser(
                        getPkOfOtherUser(chat.fields.user_1, chat.fields.user_2)
                      )
                    );
                  }}
                >
                  <ListItemAvatar sx={{ mt: 0 }}>
                    <Avatar
                      {...stringAvatar(
                        getUsername(
                          getPkOfOtherUser(
                            chat.fields.user_1,
                            chat.fields.user_2
                          )
                        )
                      )}
                    ></Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ ml: 2, mt: 0 }}
                    primary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          variant="h6"
                          color="text.primary"
                        >
                          {
                            getUsername(
                              getPkOfOtherUser(
                                chat.fields.user_1,
                                chat.fields.user_2
                              )
                            )

                            // Find out how to get it
                          }
                        </Typography>
                      </React.Fragment>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="rgba(0,0,0,0.6)"
                        >
                          {getLastMessageFrom(chat.pk)}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider />
              </div>
            );
          })}
      </List>
    </div>
  );
}
