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
import Events from "./pages/Events";
import EventsPage from "./pages/participant/EventsPage";





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
          path="/organisateur"
          element={<Events/>}
        />

        <Route
          path="/participant"
          element={<EventsPage/>}
        />

      </Routes>

    </BrowserRouter>

  )

}