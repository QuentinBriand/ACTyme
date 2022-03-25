import "./App.css";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Login from "./components/loginForm";
import { CssBaseline } from "@material-ui/core";
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
  const [user, setUser] = useState({ name: "", email: "" });
  const [error, setError] = useState("");

  const LoginCallBack = (details) => {
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
