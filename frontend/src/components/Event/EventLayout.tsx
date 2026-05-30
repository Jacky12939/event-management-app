import Navbar from "./navbar";



export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white">
      <Navbar />

      <main className="max-w-6xl mx-auto p-4">
        {children}
      </main>
    </div>
  );
}