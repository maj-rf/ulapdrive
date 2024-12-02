import { useMutation } from '@tanstack/react-query';
import { register } from '@/services/authService';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
export function useRegister() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate('/login');
      toast.success('Successfully registered user!');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
