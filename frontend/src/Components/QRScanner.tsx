// =============================================================
// src/components/QRScanner.tsx
// =============================================================

import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

interface QRScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onScanError?: (error: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({
  onScanSuccess,
  onScanError,
}) => {
  const scannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    const scannerId = "qr-scanner-container";
    const scanner = new Html5Qrcode(scannerId);
    scannerRef.current = scanner;

    scanner
      .start(
        { facingMode: "environment" }, // caméra arrière
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          onScanSuccess(decodedText);
        },
        (errorMessage) => {
          onScanError?.(errorMessage);
        },
      )
      .catch((err) => {
        console.error("Erreur démarrage scanner:", err);
      });

    return () => {
      scanner.stop().catch(() => {});
    };
  }, []);

  return (
    <div
      id="qr-scanner-container"
      style={{ width: "100%", maxWidth: 400, margin: "0 auto" }}
    />
  );
};

export default QRScanner;
