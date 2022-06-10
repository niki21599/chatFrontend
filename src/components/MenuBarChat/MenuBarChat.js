import "./MenuBarChat.css";
import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Avatar from "@mui/material/Avatar";
import { green } from "@mui/material/colors";

export default function MenuBarChat(props) {
  function stringAvatar(name) {
    if (name) {
      return {
        sx: { bgcolor: green[500], mr: 2 },
        children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
      };
    } else {
      return;
    }
  }
  return (
    <div>
      <AppBar className="space-left-chat" position="fixed" color="primary">
        <Toolbar
          variant="dense"
          sx={{ justifyContent: "start", alignItems: "center", height: 60 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              {...stringAvatar(
                props.user
                  ? props.user.fields.first_name +
                      " " +
                      props.user.fields.last_name
                  : ""
              )}
            ></Avatar>
            <Typography variant="h6">
              {props.user
                ? props.user.fields.first_name +
                  " " +
                  props.user.fields.last_name
                : ""}
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
