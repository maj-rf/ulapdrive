import { Outlet } from 'react-router';

export function RootLayout() {
  return (
    <div className="w-full min-h-screen">
      <main>
        <Outlet />
      </main>
    </div>
  );
}
