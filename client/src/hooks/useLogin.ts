import { useQueryClient, useMutation } from '@tanstack/react-query';
import { login } from '@/services/authService';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user);
      navigate('/');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
