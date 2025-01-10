import { Outlet } from 'react-router';
import { SidebarInset, SidebarProvider, SidebarTrigger } from './ui/sidebar';
import { AppSideBar } from './sidebar/AppSideBar';

export function RootLayout() {
  return (
    <SidebarProvider>
      <AppSideBar />
      <SidebarInset>
        <main className="p-2">
          <SidebarTrigger />
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
