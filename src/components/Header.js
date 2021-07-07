import { useState } from "react";
import  AppBar  from "@material-ui/core/AppBar";
import  Toolbar  from "@material-ui/core/Toolbar";
import { Typography, Button, TextField } from "@material-ui/core";
import customStyles from "../styles/customStyles";

function Logo() {
  const classes = customStyles();
  return (
    <div id="logo" className={classes.logo}>
      <Typography variant="h6" component="h2">
        Starshine
      </Typography>
      <Typography
        variant="subtitle1"
        gutterBottom
        color="textSecondary"
        // style={{color: "#b3b3b3"}}
      >
        Distraction-free Writing
      </Typography>
      {/* <h5 style={{ color: "#b3b3b3" }}>Distraction-free Writing</h5> */}
    </div>
  );
}

function LoginForm(props) {
  const classes = customStyles();
  const [formValue, setFormValue] = useState("");
  const [formError, setFormError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValue === "") {
      setFormError(true);
    } else {
      props.onLogin(formValue);
    }
  };

  return (
    <div id="login-form">
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          className={classes.field}
          label="user"
          variant="outlined"
          size="small"
          onChange={(e) => setFormValue(e.target.value)}
          error={formError}
        />
        <Button type="submit" color="primary" variant="contained" size="medium">
          Login
        </Button>
      </form>
    </div>
  );
}

function Login(props) {
  const welcomeMessage = <Typography variant="subtitle2">Welcome, {props.user}</Typography>;
  return (
    <div id="login-section">
      {props.user !== "" ? (
        welcomeMessage
      ) : (
        <LoginForm onLogin={props.onLogin} />
      )}
      {props.user && (
        <Button size="small" color="primary" onClick={() => props.onLogin("")}> Switch User </Button>
      )}
    </div>
  );
}

function Header(props) {
  const classes = customStyles();
  return (
    <div className={classes.root}>
    <AppBar 
      // position="sticky"
      color="secondary"
      elevation={0}
      className={classes.appBar}
    >
    <Toolbar>
    {/* // <div> */}
        <Logo />
        <Login user={props.user} onLogin={props.onLogin} />
    </Toolbar>
    </AppBar> 
    </div>
  );
}

export { Header };
// export { Logo, Login };
