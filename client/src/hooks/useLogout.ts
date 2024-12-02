import { logout } from '@/services/authService';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
// login mutation
export function useLogout() {
  const to = useNavigate();
  const queryClient = useQueryClient();
  // create the mutation
  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      toast.success('Successfully logged-out');
      await queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.clear();
      to('/login');
    },
  });
}
