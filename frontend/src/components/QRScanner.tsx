import { useEffect, useRef, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { QrCodeScanner } from "@mui/icons-material";

interface QRScannerProps {
  onScan: (result: string) => void;
  onError?: (error: string) => void;
}

export default function QRScanner({ onScan, onError }: QRScannerProps) {
  const [scanning, setScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setScanning(true);
    } catch {
      onError?.("Impossible d'accéder à la caméra");
    }
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    setScanning(false);
  };

  const handleManualInput = () => {
    const val = prompt("Entrer le contenu du QR code (test) :");
    if (val) onScan(val);
  };

  useEffect(() => () => stopCamera(), []);

  return (
    <Box sx={{ textAlign: "center", p: 2 }}>
      <video
        ref={videoRef}
        style={{
          width: "100%",
          maxWidth: 400,
          borderRadius: 8,
          display: scanning ? "block" : "none",
          margin: "0 auto",
        }}
      />
      {!scanning && (
        <Box sx={{ py: 4 }}>
          <QrCodeScanner sx={{ fontSize: 80, color: "grey.400" }} />
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Appuyez pour scanner un billet
          </Typography>
        </Box>
      )}
      <Button
        variant="contained"
        startIcon={<QrCodeScanner />}
        onClick={scanning ? handleManualInput : startCamera}
        sx={{ mt: 1 }}
      >
        {scanning ? "Simuler un scan" : "Démarrer le scan"}
      </Button>
      {scanning && (
        <Button onClick={stopCamera} sx={{ mt: 1, ml: 1 }} color="error">
          Arrêter
        </Button>
      )}
    </Box>
  );
}
