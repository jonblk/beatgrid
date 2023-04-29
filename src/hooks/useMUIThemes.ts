import { Theme } from "@mui/system";
import { dark, light } from "../themes";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { PaletteMode } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { selectHue } from "../features/settings/settingsSlice";

const getDesignTokens = (mode: "light" | "dark", hue: number) => ({
  typography: {
    fontSize: 17,
    body1: {
      fontSize: 16.5 
    }
  },
  palette: {
    mode,
    ...(mode === "light" ? light : dark(hue, 12, 76)),
  },
});

export default function useMUIThemes(): [Theme, {toggleColorMode: ()=> void}] {
  const [mode, setMode] = useState<PaletteMode>("dark");
  const hue = useSelector(selectHue);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => setMode((prevMode) => (prevMode === "light" ? "dark" : "light"))
    }),
    []
  );

  // Update the theme if the mode changes
  const theme = useMemo(
    () => createTheme(getDesignTokens(mode, hue)), 
    [mode, hue]
  );

  return [theme, colorMode]
}
