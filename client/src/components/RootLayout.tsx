import { Outlet } from 'react-router';

export function RootLayout() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-500 to-cyan-400">
      <main>
        <Outlet />
      </main>
    </div>
  );
}
