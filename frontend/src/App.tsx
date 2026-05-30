// =============================================================
// frontend/src/App.tsx
// =============================================================

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CheckerPage from "./pages/checkerPage";
import EventDetail from "./pages/EventDetail";
import TicketPage from "./pages/TicketPage";
import MyTickets from "./pages/MyTickets";
import EventsPage from "./pages/EventsPage";
import ProfilePage from "./pages/ProfilPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/checker" element={<CheckerPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/ticket/:ticketCode" element={<TicketPage />} />
        <Route path="/my-tickets" element={<MyTickets />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}
