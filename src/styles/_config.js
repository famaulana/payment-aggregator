import { createTheme } from "@mui/material";
import { Open_Sans } from "next/font/google";

export const openSansFont = Open_Sans({
  subsets: ["latin"],
});

export const muiTheme = createTheme({
  typography: {
    fontFamily: openSansFont.style.fontFamily,
    button: {
      textTransform: "none",
    },
    fontSize: 13,
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
    },
  },
});
