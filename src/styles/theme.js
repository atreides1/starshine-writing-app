// import { createMuiTheme } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
// import { purple } from "@material-ui/core/colors";
import { grey } from "@material-ui/core/colors";
import { amber } from "@material-ui/core/colors";
import { red } from "@material-ui/core/colors";

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: amber["600"], //#ffb300
    },
    secondary: {
      main: grey["900"], //purple["600"],
      // We don't need to set the text colour as MUI will work this out
    },
    error: {
      main: red["600"],
    },
    background: {
      default: "#242424",
    },
  },
  typography: {
    fontFamily: "Source Sans Pro",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

export default theme;
