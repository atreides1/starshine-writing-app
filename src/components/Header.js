import React from "react";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Typography, Button, TextField } from "@mui/material";

const drawerWidth = 240;

function Logo() {
  return (
    <Stack>
      <Typography variant="h6" component="h2">
        Starshine
      </Typography>
      <Typography variant="subtitle1" gutterBottom color="textSecondary">
        Distraction-free Writing
      </Typography>
    </Stack>
  );
}

function LoginForm(props) {
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
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: "none", md: "flex" },
        width: `calc(100% - ${drawerWidth}px)`,
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: "space-between",
        maxWidth: { sm: "100%", md: "1700px" },
        marginLeft: "auto",
      }}
      spacing={2}
    >
      <Box pl={2}>
        <Logo />
      </Box>
      <Box pr={2}>
        <Login user={props.user} onLogin={props.onLogin} />
      </Box>
    </Stack>
  );
}

export default Header;
