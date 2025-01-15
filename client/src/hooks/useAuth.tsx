import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import * as authService from '@/services/authService';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user);
      navigate('/');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useLogout() {
  const to = useNavigate();
  const queryClient = useQueryClient();
  // create the mutation
  return useMutation({
    mutationFn: authService.logout,
    onSuccess: async () => {
      toast.success('Successfully logged-out');
      queryClient.removeQueries();
      to('/auth');
    },
  });
}

export function useMe() {
  return useQuery({
    queryKey: ['user'],
    queryFn: authService.me,
    staleTime: Infinity,
    retry: false,
  });
}

export function useRegister() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      navigate('/login');
      toast.success('Successfully registered user!');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
