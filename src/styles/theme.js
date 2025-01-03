import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { amber } from "@mui/material/colors";
import { red } from "@mui/material/colors";

const theme = createTheme({    
    palette: {
      mode: "dark",
      primary: {
        main: amber["600"], //#ffb300
      },
      secondary: {
        main: grey["900"],
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
    }
});

export default theme;
