import React, { useState } from "react";
import { Grid, Paper, Avatar, Typography, Link, Box } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Logo from "./logo-act-no-text.svg";
import "./login.css";

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
  divFormStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  submitFormStyle: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

const Login = ({ LoginFunc, error }) => {
  const [details, setDetails] = useState({ email: "", password: "" });

  const submitHandler = (e) => {
    e.preventDefault();
    LoginFunc(details);
  };

  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <img src={Logo} height={"297px"} width={"210x"} alt="Logo" />
        <Paper
          name="login"
          style={Style.paperStyle}
          elevation={10}
          className="Login-form"
        >
          <Grid container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center">
            <Avatar style={Style.avatarStyle}>
              <LockOutlinedIcon></LockOutlinedIcon>
            </Avatar>
            <h2>Login in</h2>
          </Grid>
          <form onSubmit={submitHandler}>
            <div className="form-inner">
              <div className=" form-input" style={Style.divFormStyle}>
                <input
                  class="form__input"
                  type="text"
                  placeholder="test"
                  name="email"
                  id="email"
                  onChange={(e) =>
                    setDetails({ ...details, email: e.target.value })
                  }
                />
                <label htmlFor="email" class="label_email">Email</label>
              </div>
              <div className=" form-group" style={Style.divFormStyle}>
                <input
                  class="form__password"
                  placeholder="test"
                  type="password"
                  name="password"
                  id="|"
                  onChange={(e) =>
                    setDetails({ ...details, password: e.target.value })
                  }
                />
                <label htmlFor="password" class="label_password">Password</label>
              </div>
              <div class="form_group">

              </div>
              <div style={Style.divFormStyle}>
                <input
                  type="submit"
                  name="LoginSubmit"
                  style={Style.submitFormStyle}
                />
              </div>
            </div>
          </form>
          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label={
              <Box component="div" fontSize={15}>
                Remember me ?
              </Box>
            }
          />
          <Typography style={{ textAlign: "center" }}>
            {" "}
            Do you have an account ?{" "}
            <Link href="#" style={{ color: "#203239" }}>
              Sign Up
            </Link>
          </Typography>
          <Typography style={{ textAlign: "center" }}>
            <Link href="#" style={{ color: "#203239" }}>
              Forgot password ?
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </div>
  );
};

export default Login;
