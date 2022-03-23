import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const Login = () => {
  const paperStyle = {
    backgroundColor: "#EEEDDE",
    padding: 20,
    height: "50vh",
    width: "40vh",
    top: "0",
    borderRadius: 25,
  };

  const avatarStyle = { backgroundColor: "#141E27" };
  const gridStyle = { minHeight: "100vh" };
  const btnstyle = { margin: "8px 0", backgroundColor: "#203239"};

  return (
    <Grid
      style={gridStyle}
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Paper name="login" style={paperStyle} elevation={10}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Login in</h2>
        </Grid>
        <TextField
          label="Username"
          placeholder="Enter username"
          fullWidth
          required
        />
        <TextField
          label="Password"
          placeholder="Enter password"
          type="password"
          fullWidth
          required
        />
        <FormControlLabel
          control={<Checkbox name="checkedB" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
        >
          Sign in
        </Button>
        <Typography style={{textAlign:"center"}}>
          {" "}
          Do you have an account ? <Link href="#" style={{color: "#203239"}}>Sign Up</Link>
        </Typography>
        <Typography style={{textAlign:"center"}}>
          <Link href="#" style={{color: "#203239"}}>
              Forgot password ?
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
