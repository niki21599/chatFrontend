import "./SearchBar.css";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";

export default function SearchBar(props) {
  let [query, setQuery] = useState("");

  useEffect(() => {
    props.search(query);
  }, [query]);

  return (
    <div style={{ backgroundColor: "black" }}>
      <TextField
        sx={{
          mr: 25,
          position: "fixed",
          left: 0,
          top: 60,
          minWidth: "300px",
          maxWidth: "30vw",
        }}
        id="filled-basic"
        label="Search Chat"
        size="small"
        fullWidth
        variant="filled"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
    </div>
  );
}
