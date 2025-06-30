import { Outlet } from "react-router-dom";
import ThemeToggleButton from "@/components/Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="flex justify-between items-center px-4 py-3 border-b dark:border-gray-700">
        <h1 className="text-lg font-semibold">Project Dashboard</h1>
        <ThemeToggleButton />
      </header>

      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}