// =============================================================
// src/App.tsx
// =============================================================

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
<<<<<<< HEAD
import Events from "./pages/Events";
import EventsPage from "./pages/participant/EventsPage";





export default function App(){

  return(

=======
import CheckerPage from "./pages/checkerPage"; // ← nouveau
import MyTicket from "./pages/MyTicket";
import OrganizerPage from "./pages/OrganizerPage";
export default function App() {
  return (
>>>>>>> 739e56dbd0161c8570bab61bf1516e4c899b1f03
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD

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

=======
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/checker" element={<CheckerPage />} />
        <Route path="/my-tickets" element={<MyTicket />} />
        <Route path="/organisateur" element={<OrganizerPage />} />
>>>>>>> 739e56dbd0161c8570bab61bf1516e4c899b1f03
      </Routes>
    </BrowserRouter>
  );
}
