import "./App.css";
import MainChat from "./components/MainChat/MainChat";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import React from "react";
function App() {
  let handleLogin = (token) => {
    setLoggedIn(true);
    localStorage.setItem("token", token);
  };
  let [loggedIn, setLoggedIn] = React.useState(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    return token !== null;
  });

  let handleLogout = () => {
    setLoggedIn(false);
    localStorage.clear();
  };
  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={<Login login={handleLogin} loggedIn={loggedIn} />}
        ></Route>
        <Route
          path="/register"
          element={<Register login={handleLogin} loggedIn={loggedIn} />}
        ></Route>
        <Route
          path="/"
          element={<MainChat loggedIn={loggedIn} logout={handleLogout} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
