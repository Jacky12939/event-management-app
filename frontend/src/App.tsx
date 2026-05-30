// src/App.tsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import EventsPage from "./pages/participant/EventsPage";
import CheckerPage from "./pages/checkerPage";
import MyTicket from "./pages/MyTicket";
import OrganizerPage from "./pages/OrganizerPage";


export default function App(){
  return (
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

        <Route path="/checker" element={<CheckerPage />} />
        <Route path="/my-tickets" element={<MyTicket />} />
        <Route path="/organisateur" element={<OrganizerPage />} />
      </Routes>
    </BrowserRouter>
  );
}
