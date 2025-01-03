import Snackbar from "@mui/material/Snackbar";
import MuiAlert from '@mui/material/Alert';
import React from "react";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SaveSnackbar(props) {
    // props are viewSnackbar, setViewSnackbar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        props.setViewSnackbar(false);
    }

    return (
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={props.viewSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
          <Alert onClose={handleClose} severity="success">
              Save was successful!
          </Alert>
      </Snackbar>
    );
}
