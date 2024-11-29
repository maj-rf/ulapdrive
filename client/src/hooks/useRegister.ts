import { useQueryClient, useMutation } from '@tanstack/react-query';
import { register } from '@/services/authService';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
export function useRegister() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: register,
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user);
      navigate('/login');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
