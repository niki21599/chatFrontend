import React, { useState } from "react";
import "./Register.css";

import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { register } from "../../apiCalls";
import { Navigate } from "react-router-dom";

export default function Register(props) {
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password_repeat, setPasswordRepeat] = useState("");
  let [password, setPassword] = useState("");
  let [passwordError, setPasswordError] = useState("");
  let [usernameError, setUsernameError] = useState("");
  let [first_name, setFirstName] = useState(false);
  let [last_name, setLastName] = useState(false);

  let handleChange = (e) => {
    if (e.currentTarget.id == "username") {
      setUsername(e.currentTarget.value);
    } else if (e.currentTarget.id == "email") {
      setEmail(e.currentTarget.value);
    } else if (e.currentTarget.id == "password_repeat") {
      setPasswordRepeat(e.currentTarget.value);
    } else if (e.currentTarget.id == "password") {
      setPassword(e.currentTarget.value);
    } else if (e.currentTarget.id == "first_name") {
      setFirstName(e.currentTarget.value);
    } else if (e.currentTarget.id == "last_name") {
      setLastName(e.currentTarget.value);
    }
    setPasswordError(false);
    setUsernameError(false);
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    // Register
    register(
      username,
      password,
      password_repeat,
      email,
      first_name,
      last_name
    ).then((result) => {
      if (result.token) {
        props.login(result.token);
      } else if (result.errorMessage == "Username already exists") {
        setPassword("");
        setPasswordRepeat("");
        setUsernameError(true);
      } else if (result.errorMessage == "Passwords don't match") {
        setPassword("");
        setPasswordRepeat("");
        setPasswordError(true);
      }
    });
  };

  return (
    <div>
      {props.loggedIn ? (
        <Navigate to="/" />
      ) : (
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid lightgray",
            width: 350,
            boxShadow: "2px -1px 5px rgba(0,0,0,0.2)",
            marginLeft: "calc(50vw - 176px)",
            marginBottom: 4,
          }}
        >
          <Typography component="h1" variant="h5" sx={{ marginTop: 1 }}>
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={(e) => handleSubmit(e)}
            noValidate
            sx={{ mt: 1, marginLeft: 2, marginRight: 2 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="first_name"
              label="First Name"
              name="username"
              autoComplete="username"
              autoFocus
              value={first_name}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="last_name"
              label="Last Name"
              name="username"
              autoComplete="username"
              autoFocus
              value={last_name}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              autoComplete="username"
              autoFocus
              value={email}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              autoComplete="current-password"
              onChange={(e) => handleChange(e)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password_repeat"
              label="Repeat Password"
              type="password"
              id="password_repeat"
              value={password_repeat}
              autoComplete="current-password"
              onChange={(e) => handleChange(e)}
            />
            {passwordError ? (
              <Typography
                variant="string"
                align="center"
                sx={{ marginTop: 1, color: "red" }}
              >
                Passwords don't match
              </Typography>
            ) : (
              ""
            )}
            {usernameError ? (
              <Typography
                variant="string"
                align="center"
                sx={{ marginTop: 1, color: "red" }}
              >
                Username already exists
              </Typography>
            ) : (
              ""
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
          <Typography variant="string" sx={{ marginTop: 1, marginBottom: 1 }}>
            Click{" "}
            <Link to="/login" className="link">
              {"here "}
            </Link>
            to login.
          </Typography>
        </Box>
      )}
    </div>
  );
}
