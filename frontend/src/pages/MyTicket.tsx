import { useEffect, useState } from "react";
import { getMyRegistrations } from "../services/registration.service";

const MyTicket = () => {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyRegistrations()
      .then(setRegistrations)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement...</p>;

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
            <h3>🎫 {reg.event?.title}</h3>
            <p>📅 {new Date(reg.event?.date).toLocaleDateString()}</p>
            <p>📍 {reg.event?.location}</p>
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