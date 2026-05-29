// =============================================================
// src/pages/CheckerPage.tsx
// Interface du gardien — scan et vérification des billets QR
// =============================================================

import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Chip,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  QrCodeScanner,
  CheckCircle,
  Cancel,
  Replay,
  Badge,
  Event,
  LocationOn,
} from "@mui/icons-material";
import QRScanner from "../components/QRScanner";

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------
type ScanStatus =
  | "idle"
  | "scanning"
  | "loading"
  | "valid"
  | "invalid"
  | "already_checked";

interface TicketInfo {
  attendeeName: string;
  attendeeEmail: string;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  checkedIn: boolean;
}

// ------------------------------------------------------------------
// Données mock (à remplacer par les vrais appels API plus tard)
// ------------------------------------------------------------------
const MOCK_TICKETS: Record<string, TicketInfo> = {
  "TICKET-001-ABC": {
    attendeeName: "Marie Dupont",
    attendeeEmail: "marie@email.com",
    eventTitle: "Workshop React Avancé",
    eventDate: "2026-06-15",
    eventLocation: "Yaoundé, Cameroun",
    checkedIn: false,
  },
  "TICKET-002-DEF": {
    attendeeName: "Jean Kamga",
    attendeeEmail: "jean@email.com",
    eventTitle: "Workshop React Avancé",
    eventDate: "2026-06-15",
    eventLocation: "Yaoundé, Cameroun",
    checkedIn: true, // déjà scanné
  },
};

// ------------------------------------------------------------------
// Composant principal
// ------------------------------------------------------------------
const CheckerPage = () => {
  const [status, setStatus] = useState<ScanStatus>("idle");
  const [ticketInfo, setTicketInfo] = useState<TicketInfo | null>(null);
  const [scannedCode, setScannedCode] = useState<string>("");
  const [manualCode, setManualCode] = useState<string>("");

  // Vérification du ticket (mock)
  const verifyTicket = (code: string) => {
    setScannedCode(code);
    setStatus("loading");

    // Simulation d'un appel API (500ms de délai)
    setTimeout(() => {
      const ticket = MOCK_TICKETS[code];

      if (!ticket) {
        setStatus("invalid");
        setTicketInfo(null);
        return;
      }

      if (ticket.checkedIn) {
        setStatus("already_checked");
        setTicketInfo(ticket);
        return;
      }

      // Marquer comme scanné
      MOCK_TICKETS[code].checkedIn = true;
      setTicketInfo({ ...ticket, checkedIn: true });
      setStatus("valid");
    }, 500);
  };

  const handleScanSuccess = (decodedText: string) => {
    if (status === "scanning") {
      verifyTicket(decodedText);
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setTicketInfo(null);
    setScannedCode("");
    setManualCode("");
  };

  // ------------------------------------------------------------------
  // Rendu selon le statut
  // ------------------------------------------------------------------
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 3,
      }}
    >
      {/* En-tête */}
      <Box sx={{ textAlign: "center", mb: 4, mt: 2 }}>
        <QrCodeScanner sx={{ fontSize: 48, color: "#38bdf8", mb: 1 }} />
        <Typography variant="h4" fontWeight={700} color="white">
          Contrôle d'accès
        </Typography>
        <Typography variant="body2" color="#94a3b8" mt={0.5}>
          Scanner le QR code du billet
        </Typography>
      </Box>

      <Box sx={{ width: "100%", maxWidth: 480 }}>
        {/* ---- IDLE : bouton pour démarrer ---- */}
        {status === "idle" && (
          <Paper
            sx={{
              p: 4,
              borderRadius: 4,
              backgroundColor: "#1e293b",
              textAlign: "center",
              border: "1px solid #334155",
            }}
          >
            <Typography color="#94a3b8" mb={3}>
              Appuyez sur le bouton pour activer la caméra et scanner un billet.
            </Typography>

            <Button
              variant="contained"
              size="large"
              startIcon={<QrCodeScanner />}
              onClick={() => setStatus("scanning")}
              sx={{
                backgroundColor: "#38bdf8",
                color: "#0f172a",
                fontWeight: 700,
                borderRadius: 3,
                px: 4,
                py: 1.5,
                textTransform: "none",
                fontSize: 16,
                "&:hover": { backgroundColor: "#0ea5e9" },
              }}
            >
              Scanner un billet
            </Button>

            <Divider sx={{ my: 3, borderColor: "#334155" }}>
              <Typography variant="caption" color="#64748b">
                OU
              </Typography>
            </Divider>

            {/* Saisie manuelle du code */}
            <Typography color="#94a3b8" mb={1} variant="body2">
              Saisir le code manuellement
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <input
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                placeholder="Ex: TICKET-001-ABC"
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  borderRadius: 8,
                  border: "1px solid #334155",
                  backgroundColor: "#0f172a",
                  color: "white",
                  fontSize: 14,
                  outline: "none",
                }}
              />
              <Button
                variant="outlined"
                onClick={() => manualCode && verifyTicket(manualCode)}
                sx={{
                  borderColor: "#38bdf8",
                  color: "#38bdf8",
                  borderRadius: 2,
                  textTransform: "none",
                  "&:hover": { borderColor: "#0ea5e9", color: "#0ea5e9" },
                }}
              >
                Vérifier
              </Button>
            </Box>
          </Paper>
        )}

        {/* ---- SCANNING : caméra active ---- */}
        {status === "scanning" && (
          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              backgroundColor: "#1e293b",
              border: "1px solid #334155",
            }}
          >
            <Alert
              severity="info"
              sx={{ mb: 2, backgroundColor: "#0c4a6e", color: "#bae6fd" }}
            >
              Pointez la caméra vers le QR code du billet
            </Alert>

            <QRScanner onScanSuccess={handleScanSuccess} />

            <Button
              fullWidth
              variant="outlined"
              onClick={handleReset}
              sx={{
                mt: 2,
                borderColor: "#475569",
                color: "#94a3b8",
                borderRadius: 2,
                textTransform: "none",
              }}
            >
              Annuler
            </Button>
          </Paper>
        )}

        {/* ---- LOADING ---- */}
        {status === "loading" && (
          <Paper
            sx={{
              p: 4,
              borderRadius: 4,
              backgroundColor: "#1e293b",
              textAlign: "center",
              border: "1px solid #334155",
            }}
          >
            <CircularProgress sx={{ color: "#38bdf8" }} size={48} />
            <Typography color="#94a3b8" mt={2}>
              Vérification en cours...
            </Typography>
          </Paper>
        )}

        {/* ---- VALID : billet valide ---- */}
        {status === "valid" && ticketInfo && (
          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              backgroundColor: "#052e16",
              border: "2px solid #16a34a",
            }}
          >
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <CheckCircle sx={{ fontSize: 64, color: "#4ade80" }} />
              <Typography variant="h5" fontWeight={700} color="#4ade80" mt={1}>
                Billet Valide ✓
              </Typography>
              <Chip
                label="ACCÈS AUTORISÉ"
                sx={{
                  backgroundColor: "#16a34a",
                  color: "white",
                  fontWeight: 700,
                  mt: 1,
                }}
              />
            </Box>

            <Divider sx={{ borderColor: "#166534", mb: 2 }} />

            {/* Infos participant */}
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}
            >
              <Badge sx={{ color: "#4ade80" }} />
              <Box>
                <Typography color="#86efac" variant="caption">
                  Participant
                </Typography>
                <Typography color="white" fontWeight={600}>
                  {ticketInfo.attendeeName}
                </Typography>
                <Typography color="#94a3b8" variant="caption">
                  {ticketInfo.attendeeEmail}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}
            >
              <Event sx={{ color: "#4ade80" }} />
              <Box>
                <Typography color="#86efac" variant="caption">
                  Événement
                </Typography>
                <Typography color="white" fontWeight={600}>
                  {ticketInfo.eventTitle}
                </Typography>
                <Typography color="#94a3b8" variant="caption">
                  {new Date(ticketInfo.eventDate).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}
            >
              <LocationOn sx={{ color: "#4ade80" }} />
              <Box>
                <Typography color="#86efac" variant="caption">
                  Lieu
                </Typography>
                <Typography color="white" fontWeight={600}>
                  {ticketInfo.eventLocation}
                </Typography>
              </Box>
            </Box>

            <Button
              fullWidth
              variant="contained"
              startIcon={<Replay />}
              onClick={handleReset}
              sx={{
                backgroundColor: "#16a34a",
                color: "white",
                fontWeight: 700,
                borderRadius: 3,
                py: 1.5,
                textTransform: "none",
                "&:hover": { backgroundColor: "#15803d" },
              }}
            >
              Scanner le prochain billet
            </Button>
          </Paper>
        )}

        {/* ---- ALREADY CHECKED : déjà scanné ---- */}
        {status === "already_checked" && ticketInfo && (
          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              backgroundColor: "#451a03",
              border: "2px solid #d97706",
            }}
          >
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Cancel sx={{ fontSize: 64, color: "#fbbf24" }} />
              <Typography variant="h5" fontWeight={700} color="#fbbf24" mt={1}>
                Déjà Scanné ⚠️
              </Typography>
              <Chip
                label="BILLET DÉJÀ UTILISÉ"
                sx={{
                  backgroundColor: "#d97706",
                  color: "white",
                  fontWeight: 700,
                  mt: 1,
                }}
              />
            </Box>

            <Divider sx={{ borderColor: "#92400e", mb: 2 }} />

            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}
            >
              <Badge sx={{ color: "#fbbf24" }} />
              <Box>
                <Typography color="#fde68a" variant="caption">
                  Participant
                </Typography>
                <Typography color="white" fontWeight={600}>
                  {ticketInfo.attendeeName}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}
            >
              <Event sx={{ color: "#fbbf24" }} />
              <Box>
                <Typography color="#fde68a" variant="caption">
                  Événement
                </Typography>
                <Typography color="white" fontWeight={600}>
                  {ticketInfo.eventTitle}
                </Typography>
              </Box>
            </Box>

            <Button
              fullWidth
              variant="contained"
              startIcon={<Replay />}
              onClick={handleReset}
              sx={{
                backgroundColor: "#d97706",
                color: "white",
                fontWeight: 700,
                borderRadius: 3,
                py: 1.5,
                textTransform: "none",
                "&:hover": { backgroundColor: "#b45309" },
              }}
            >
              Scanner un autre billet
            </Button>
          </Paper>
        )}

        {/* ---- INVALID : billet invalide ---- */}
        {status === "invalid" && (
          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              backgroundColor: "#450a0a",
              border: "2px solid #dc2626",
            }}
          >
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Cancel sx={{ fontSize: 64, color: "#f87171" }} />
              <Typography variant="h5" fontWeight={700} color="#f87171" mt={1}>
                Billet Invalide ✗
              </Typography>
              <Chip
                label="ACCÈS REFUSÉ"
                sx={{
                  backgroundColor: "#dc2626",
                  color: "white",
                  fontWeight: 700,
                  mt: 1,
                }}
              />
            </Box>

            <Alert
              severity="error"
              sx={{ backgroundColor: "#7f1d1d", color: "#fca5a5", mb: 3 }}
            >
              Code scanné : <strong>{scannedCode}</strong>
              <br />
              Ce billet ne correspond à aucun événement valide.
            </Alert>

            <Button
              fullWidth
              variant="contained"
              startIcon={<Replay />}
              onClick={handleReset}
              sx={{
                backgroundColor: "#dc2626",
                color: "white",
                fontWeight: 700,
                borderRadius: 3,
                py: 1.5,
                textTransform: "none",
                "&:hover": { backgroundColor: "#b91c1c" },
              }}
            >
              Réessayer
            </Button>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default CheckerPage;
