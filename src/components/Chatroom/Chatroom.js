import React from "react";
import "./Chatroom.css";

export default function Chatroom(props) {
  function formatToTime(date) {
    let dateJs = new Date(date);
    let time = dateJs.toTimeString();
    return time.substring(0, 5);
  }
  function formatToDate(date) {
    let dateJs = new Date(date);
    var month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ][dateJs.getMonth()];
    return dateJs.getDay() + ". " + month;
  }

  return (
    <div
      className="space-left-chat"
      style={{
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        top: "60px",
        bottom: "76px",
        backgroundImage: "url(/chatBackground.png)",
        height: "calc(100vh - 136px)",
        overflow: "auto",
      }}
    >
      {props.messages.map((message) => (
        <div
          key={message.pk}
          className={
            message.fields.sender === props.user_id
              ? " message self"
              : "message"
          }
        >
          <div className="message-content">{message.fields.text}</div>
          <div className="date-content ">
            <div>{formatToTime(message.fields.created_at)}</div>
            <div> {formatToDate(message.fields.created_at)}</div>
            {/* {formatDate(message.fields.created_at)} */}
          </div>
        </div>
      ))}
    </div>
  );
}
