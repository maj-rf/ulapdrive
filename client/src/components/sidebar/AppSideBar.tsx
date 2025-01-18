import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { UserNav } from './UserNav';
import { FoldersList } from '../folders/FoldersList';
import { NavLink } from 'react-router';
import { FolderCreateForm } from '../folders/FolderCreateForm';

export const AppSideBar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <NavLink to="/">
                <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground overflow-hidden">
                  <img src="./ulap.webp" alt="ulapdrive-logo" />
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
        <SidebarGroup>
          <FolderCreateForm />
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Folders</SidebarGroupLabel>
          <FoldersList />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserNav />
      </SidebarFooter>
    </Sidebar>
  );
};
