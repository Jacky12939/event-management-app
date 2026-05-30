import { useState } from "react";
import axios from "axios";

interface Props {
  eventId: string;
  eventTitle: string;
}

const RegisterEvent = ({ eventId, eventTitle }: Props) => {
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:3000/api/events/${eventId}/register`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setQrCode(response.data.qrCode);
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>{eventTitle}</h2>

      {!success ? (
        <button
          onClick={handleRegister}
          disabled={loading}
          style={{
            backgroundColor: "#E8460A",
            color: "white",
            padding: "12px 24px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          {loading ? "Inscription..." : "S'inscrire à cet événement"}
        </button>
      ) : (
        <div>
          <h3>✅ Inscription réussie !</h3>
          <p>Voici votre billet numérique :</p>
          {qrCode && (
            <img
              src={qrCode}
              alt="QR Code billet"
              style={{ width: "200px", height: "200px" }}
            />
          )}
          <p>Présentez ce QR code à l'entrée</p>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default RegisterEvent;