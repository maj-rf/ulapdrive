import { Outlet } from 'react-router';
import { SidebarInset, SidebarProvider, SidebarTrigger } from './ui/sidebar';
import { AppSideBar } from './sidebar/AppSideBar';
import { Breadcrumb } from './Breadcrumb';

export function RootLayout() {
  return (
    <SidebarProvider>
      <AppSideBar />
      <SidebarInset>
        <div className="flex flex-col">
          <div className="inline-flex gap-4 m-2">
            <SidebarTrigger />
            <Breadcrumb />
          </div>
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
