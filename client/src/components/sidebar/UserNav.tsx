import { useLogout, useMe } from '@/hooks/useAuth';
import { ModeToggle } from '../ModeToggle';
import { Button } from '../ui/button';
import { SidebarMenu, SidebarMenuItem } from '../ui/sidebar';
import { Loading } from '../Loading';
export const UserNav = () => {
  const { data, isPending, error } = useMe();
  const logoutMutation = useLogout();
  const handleLogout = () => {
    logoutMutation.mutate();
  };

  if (isPending)
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <Loading />
        </SidebarMenuItem>
      </SidebarMenu>
    );

  if (error) return <div>{error.message}</div>;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex items-center gap-2">
          <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
            {data.displayName.slice(0, 1).toUpperCase()}
          </div>
          <div className="grid text-left text-sm leading-tight">
            <span className="truncate font-semibold">Hi, {data.displayName}!</span>
            <span className="truncate text-xs">{data.email}</span>
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
