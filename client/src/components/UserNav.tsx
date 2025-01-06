import { useLogout } from '@/hooks/useLogout';
import { ModeToggle } from './ModeToggle';
import { Button } from './ui/button';
import { SidebarMenu, SidebarMenuItem } from './ui/sidebar';
export const UserNav = ({ displayName, email }: { displayName: string; email: string }) => {
  const logoutMutation = useLogout();
  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex items-center gap-2">
          <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
            {displayName.slice(0, 1).toUpperCase()}
          </div>
          <div className="grid text-left text-sm leading-tight">
            <span className="truncate font-semibold">Hi, {displayName}!</span>
            <span className="truncate text-xs">{email}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <ModeToggle />
          <Button onClick={handleLogout} className="flex-1">
            Logout
          </Button>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
