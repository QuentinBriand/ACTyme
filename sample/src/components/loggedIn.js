import { Paper } from "@material-ui/core";
import React, { useState } from "react";
import Login from "./loginForm";

const Style = {
  paperStyle: {
    backgroundColor: "#EEEDDE",
    padding: 10,
    height: "50vh",
    width: "20vw",
    top: "0",
    borderRadius: 25,
    minHeight: "380px",
    maxHeight: "20px",
    minWidth: "300px",
    maxWidth: "20px",
  },
  avatarStyle: {
    backgroundColor: "#141E27",
    height: "5vh",
    width: "5vh",
    minHeight: "35px",
    minWidth: "35px",
    maxHeight: "75px",
    maxWidth: "75px",
  },
  divStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
};

const IsLogged = ({ LoginInfo, Logout }) => {
  return (
    <div style={Style.divStyle}>
      <Paper
        name="login"
        style={Style.paperStyle}
        elevation={10}
        className="Login-form">
        <h3>Hello {LoginInfo.email} :D</h3>
        <button onClick={Logout}>Log out</button>
      </Paper>
    </div>
  );
};

export default IsLogged;
