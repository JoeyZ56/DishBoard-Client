import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: `'Inter', sans-serif`,
  },
  palette: {
    primary: {
      main: "#FFC107",
    },
    background: {
      default: "#FFF8E1",
    },
  },
});

export default theme;
