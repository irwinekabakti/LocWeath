import { createTheme } from "@mui/material";
import { Colors } from "../helper/Color";

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.text,
    },
    secondary: {
      main: Colors.secondaryText,
    },
  },
  typography: {
    fontFamily: "Segoe UI",
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          flexDirection: "row",
          display: "flex",
          gap: "1rem",
          justifyContent: "flex-start",
          fontWeight: "bold",
          "&.Mui-selected": {
            color: Colors.blue,
          },
        },
      },
    },
  },
});

export { theme };
