import "./ChatTextField.css";
import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { postMessage } from "../../apiCalls";

export default function ChatTextField(props) {
  let [message, setMessage] = React.useState("");

  let saveMessage = () => {
    postMessage(props.chat_id, message).then((result) => {
      let newMessages = [...props.messages];
      newMessages.push(result[0]);
      props.setMessages(newMessages);
      setMessage("");
    });
  };

  return (
    <div
      className="space-left-chat"
      style={{
        padding: "10px 10px 10px 10px",
        position: "fixed",
        bottom: 0,
        backgroundColor: "white",
      }}
    >
      <FormControl
        variant="filled"
        sx={{ width: "calc(100% - 20px)" }}
        color=""
      >
        <InputLabel htmlFor="outlined-adornment-password">
          Your Message
        </InputLabel>
        <OutlinedInput
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="outlined-adornment-password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                edge="end"
                onClick={saveMessage}
              >
                <ArrowForwardIcon />
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
    </div>
  );
}
