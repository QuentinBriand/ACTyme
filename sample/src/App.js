import "./App.css";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Login from "./components/loginForm";
import { CssBaseline } from "@material-ui/core";
import { format } from 'react-string-format';
import IsLogged from "./components/loggedIn";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    milannWidth: "100vw",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/forest.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));

function App() {
  const [user, setUser] = useState({ password: "", email: "" });
  const [error, setError] = useState("");

  const LoginCallBack = async (details) => {
    const cemail = details.email;
    const cpass = details.password;
    const api_call = `http://10.16.242.165:3002/verify/${cemail}/${cpass}`;
    // const resp = await fetch(api_call);
    setUser({
      name: details.name,
      email: details.email,
    });
  };

  const LoggedOutCallBack = (details) => {
    setUser({
      name: "",
      email: "",
    });
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      {user.email !== "" ? (
        <IsLogged LoginInfo={user} Logout={LoggedOutCallBack} />
      ) : (
        <Login LoginFunc={LoginCallBack} error={LoggedOutCallBack} />
      )}
    </div>
  );
}

export default App;
