import { Outlet } from 'react-router';
import { SidebarInset, SidebarProvider, SidebarTrigger } from './ui/sidebar';
import { AppSideBar } from './sidebar/AppSideBar';
import { Breadcrumb } from './Breadcrumb';

export function RootLayout() {
  return (
    <SidebarProvider>
      <AppSideBar />
      <SidebarInset>
        <main className="p-2">
          <div className="inline-flex gap-4">
            <SidebarTrigger />
            <Breadcrumb />
          </div>
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
