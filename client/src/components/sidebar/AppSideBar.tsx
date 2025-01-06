import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { UserNav } from './UserNav';
import { Cloud } from 'lucide-react';
import { FolderSideBar } from '../folders/FolderSideBar';
import { useMe } from '@/hooks/useMe';
import { Loading } from '../Loading';
import { Navigate, NavLink } from 'react-router';

export const AppSideBar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const { data, isPending } = useMe();
  if (isPending) return <Loading />;
  if (!data) return <Navigate to="/login" />;

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <NavLink to="/">
                <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
                  <Cloud />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Ulapdrive</span>
                  <span className="truncate text-xs">File Upload</span>
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <FolderSideBar userId={data.id} />
      </SidebarContent>
      <SidebarFooter>
        <UserNav email={data.email} displayName={data.displayName} />
      </SidebarFooter>
    </Sidebar>
  );
};
