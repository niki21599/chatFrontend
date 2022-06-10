import "./AddChatDialog";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { getUsersWithoutChat } from "../../apiCalls";
import { postChat } from "../../apiCalls";
import { Divider, List, ListItem, ListItemText } from "@mui/material";
import { getSuggestedQuery } from "@testing-library/react";

export default function AddChatDialog(props) {
  let [users, setUsers] = useState([]);
  let [query, setQuery] = useState("");
  const handleClose = () => {
    props.setOpen(false);
  };
  useEffect(() => {
    getUsersWithoutChat().then((result) => {
      setUsers(result);
      console.log("The ", result);
    });
  }, [props.chats]);

  useEffect(() => {
    setQuery(query);
  }, [query]);

  const addChat = (user_id) => {
    postChat(user_id).then((result) => {
      props.addChat(result[0]);
      handleClose();
    });
  };

  return (
    <Dialog open={props.open} onClose={handleClose}>
      <DialogTitle>Add Chat</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Select the Chat you would like to add.{" "}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </DialogContent>
      <List
        sx={{
          bgcolor: "background.paper",
          cursor: "pointer",
          maxHeight: "250px",
          overflowY: "auto",
        }}
      >
        <Divider />
        {users
          .filter((user) => {
            let name = user.fields.first_name + " " + user.fields.last_name;
            return name.toLowerCase().includes(query.toLowerCase());
          })
          .map((user) => (
            <div key={user.pk}>
              <ListItem onClick={() => addChat(user.pk)}>
                <ListItemText
                  primary={user.fields.first_name + " " + user.fields.last_name}
                />
              </ListItem>
              <Divider />
            </div>
          ))}
      </List>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
