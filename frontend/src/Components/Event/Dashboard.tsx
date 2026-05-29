import Sidebar from "./Sidebar";


export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-950 min-h-screen">

        <h1 className="text-3xl font-bold mb-6">
          Dashboard Admin
        </h1>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-4">

          <div className="p-4 rounded-xl bg-white dark:bg-gray-900 shadow">
            Total Events
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-gray-900 shadow">
            Active Events
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-gray-900 shadow">
            Users
          </div>

        </div>

      </main>
    </div>
  );
}