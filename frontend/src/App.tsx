// App.tsx

import {
  BrowserRouter,
  Routes,
  Route
}
from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/event";




export default function App(){

  return(

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Landing/>}
        />

        <Route
          path="/login"
          element={<Login/>}
        />

        <Route
          path="/register"
          element={<Register/>}
        />

        <Route
          path="/dashboard"
          element={<Dashboard/>}
        />

        <Route
          path="/events"
          element={<Events/>}
        />

      </Routes>

    </BrowserRouter>

  )

}