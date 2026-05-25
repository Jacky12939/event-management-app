
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "./App";
import './index.css'
import { ThemeProvider } from "./context/ThemeContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);


// main.tsx

// import React from "react";
// import ReactDOM from "react-dom/client";

// import App from "./App";

// import {
//   ThemeProvider
// }
// from "./context/ThemeContext";

// ReactDOM.createRoot(
//   document.getElementById("root")!
// ).render(

//   <ThemeProvider>

//     <App/>

//   </ThemeProvider>

// );