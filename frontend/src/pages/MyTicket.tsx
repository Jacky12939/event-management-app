import { useState } from "react";

const MOCK_REGISTRATIONS = [
  {
    id: "reg-001",
    ticketCode: "TICKET-001-ABC",
    qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TICKET-001-ABC",
    event: {
      title: "Concert Jazz Yaoundé",
      date: "2026-06-15",
      location: "Palais des Congrès, Yaoundé",
    },
  },
  {
    id: "reg-002",
    ticketCode: "TICKET-002-DEF",
    qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TICKET-002-DEF",
    event: {
      title: "Tech Summit Douala 2026",
      date: "2026-07-20",
      location: "Hôtel Akwa Palace, Douala",
    },
  },
];

const MyTicket = () => {
  const registrations = MOCK_REGISTRATIONS;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Mes Billets</h2>
      {registrations.length === 0 ? (
        <p>Vous n'avez pas encore de billets.</p>
      ) : (
        registrations.map((reg) => (
          <div key={reg.id} style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "16px"
          }}>
            <h3> {reg.event?.title}</h3>
            <p> {new Date(reg.event?.date).toLocaleDateString()}</p>
            <p> {reg.event?.location}</p>
            <p>Code : <strong>{reg.ticketCode}</strong></p>
            {reg.qrCode && (
              <img src={reg.qrCode} alt="QR Code" width={200} />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MyTicket;
