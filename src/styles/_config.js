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
});
