import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useMemo } from "react";
import { themeSettings } from "./themes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Scenes/Navbar";
import Dashboard from "./Scenes/Dashboard";
import Prediction from "./Scenes/Prediction";

function App() {
  
  const theme = useMemo(() => createTheme(themeSettings), []);
  
  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar />
          <Box width={"100%"} height={"100%"} padding={window.innerWidth > 600 ? "1rem 2rem 4rem 2rem" : "1rem 1rem 2rem 1rem"}>
            <Routes>
              <Route path="/" element = {<Dashboard />}>  </Route>
              <Route path="/predictions" element = {<Prediction />}>  </Route>
            </Routes>
          </Box>
          {/* <Box
            textAlign={"center"}
            padding={".8rem 0"}
            color={"#FFF"}
            borderTop = {"1px solid rgba(255, 255, 255, 0.1)"}
            borderBottom={"none"}
            position={"relative"}
            bottom={0}
          >
            Developed by ⚡
          </Box> */}
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
