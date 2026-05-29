// =============================================================
// src/App.tsx
// =============================================================

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CheckerPage from "./pages/checkerPage"; // ← nouveau
import MyTicket from "./pages/MyTicket";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/checker" element={<CheckerPage />} />
        <Route path="/my-tickets" element={<MyTicket />} />
      </Routes>
    </BrowserRouter>
  );
}
