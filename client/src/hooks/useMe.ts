import { me } from '@/services/authService';
import { useQuery } from '@tanstack/react-query';

export function useMe() {
  return useQuery({
    queryKey: ['user'],
    queryFn: me,
    staleTime: Infinity,
    retry: false,
  });
}
