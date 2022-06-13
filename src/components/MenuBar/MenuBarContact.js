import React, { useState } from "react";
import "./MenuBarContact.css";

import AppBar from "@mui/material/AppBar";

import Toolbar from "@mui/material/Toolbar";

import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import AddChatDialog from "../AddChatDialog/AddChatDialog";

export default function MenuBarContact(props) {
  let [openDialog, setOpenDialog] = useState(false);
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  return (
    <div>
      <AppBar
        position="fixed"
        color="primary"
        sx={{
          borderRight: "1px solid rgba(0,0,0,0.5)",
          left: 0,
          minWidth: "300px",
          maxWidth: "30vw",
        }}
      >
        <Toolbar
          variant="dense"
          sx={{ justifyContent: "end", height: 60, alignItems: "center" }}
        >
          <div style={{ display: "flex" }}>
            <Avatar sx={{ bgcolor: deepOrange[500], mr: 2 }}></Avatar>
            <IconButton
              edge={false}
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleClickOpen}
            >
              <AddIcon />
            </IconButton>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={() => props.logout()}
            >
              <LogoutIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <AddChatDialog
        open={openDialog}
        setOpen={setOpenDialog}
        chats={props.chats}
        addChat={props.addChat}
        openChatWithId={props.openChatWithId}
        openNewChat={props.openNewChat}
      />
    </div>
  );
}
