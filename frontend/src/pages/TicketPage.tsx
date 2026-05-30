// =============================================================
// frontend/src/pages/TicketPage.tsx
// Affiche le billet avec QR code après inscription
// =============================================================

import { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { FaHome, FaDownload, FaTicketAlt } from "react-icons/fa";
import QRCode from "qrcode";

export default function TicketPage() {
  const { ticketCode } = useParams<{ ticketCode: string }>();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Générer le QR code dans le canvas
  useEffect(() => {
    if (canvasRef.current && ticketCode) {
      QRCode.toCanvas(canvasRef.current, ticketCode, {
        width: 220,
        margin: 2,
        color: {
          dark: "#1e293b",
          light: "#ffffff",
        },
      });
    }
  }, [ticketCode]);

  // Télécharger le QR code en PNG
  const handleDownload = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `billet-${ticketCode}.png`;
    link.href = url;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 max-w-sm w-full overflow-hidden">
        {/* En-tête du billet */}
        <div className="bg-blue-600 px-6 py-5 text-center">
          <FaTicketAlt className="text-white text-3xl mx-auto mb-2" />
          <h1 className="text-2xl font-bold text-white">Mon Billet</h1>
          <p className="text-blue-100 text-sm mt-1">
            Présentez ce QR code à l'entrée
          </p>
        </div>

        {/* Séparateur dentelé */}
        <div className="flex items-center">
          <div className="h-4 w-4 rounded-full bg-gray-50 dark:bg-gray-900 -ml-2" />
          <div className="flex-1 border-t-2 border-dashed border-gray-200 dark:border-gray-700" />
          <div className="h-4 w-4 rounded-full bg-gray-50 dark:bg-gray-900 -mr-2" />
        </div>

        {/* QR Code */}
        <div className="flex flex-col items-center px-6 py-6 space-y-4">
          <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
            <canvas ref={canvasRef} />
          </div>

          {/* Code texte */}
          <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-3 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Code du billet
            </p>
            <p className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400 break-all">
              {ticketCode}
            </p>
          </div>

          {/* Avertissement */}
          <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
            Ce billet est personnel et non transférable. Il ne peut être utilisé
            qu'une seule fois.
          </p>
        </div>

        {/* Séparateur dentelé */}
        <div className="flex items-center">
          <div className="h-4 w-4 rounded-full bg-gray-50 dark:bg-gray-900 -ml-2" />
          <div className="flex-1 border-t-2 border-dashed border-gray-200 dark:border-gray-700" />
          <div className="h-4 w-4 rounded-full bg-gray-50 dark:bg-gray-900 -mr-2" />
        </div>

        {/* Boutons */}
        <div className="px-6 py-5 space-y-3">
          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >
            <FaDownload />
            Télécharger le QR code
          </button>

          <Link
            to="/"
            className="w-full flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-semibold transition"
          >
            <FaHome />
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
