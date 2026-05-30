import type { ReactNode } from "react";

import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
}

export default function ParticipantLayout({
  children,
}: Props) {
  return (
    <div
      className="
      min-h-screen
      bg-slate-100
      dark:bg-slate-950
      text-slate-900
      dark:text-white
    "
    >
      {/* NAVBAR */}

      <nav
        className="
        bg-white
        dark:bg-slate-900
        shadow-md
        px-6
        py-4
        flex
        items-center
        justify-between
      "
      >
        <h1
          className="
          text-2xl
          font-bold
          text-violet-600
        "
        >
          SGE
        </h1>

        <div
          className="
          flex
          items-center
          gap-6
        "
        >
          <Link to="/">Accueil</Link>

          <Link to="/events">Événements</Link>
        </div>
      </nav>

      {/* CONTENT */}

      <main className="p-5">{children}</main>
    </div>
  );
}