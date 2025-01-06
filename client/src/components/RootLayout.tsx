import { Outlet } from 'react-router';
import { SidebarInset, SidebarProvider, SidebarTrigger } from './ui/sidebar';
import { AppSideBar } from './AppSideBar';

export function RootLayout() {
  return (
    <SidebarProvider>
      <AppSideBar />
      <SidebarInset>
        <main>
          <div className="p-2">
            <SidebarTrigger />
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
