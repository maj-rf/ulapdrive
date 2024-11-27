import { useQuery } from '@tanstack/react-query';

// api call
export function getUser() {
  return;
}

// user query
export function useGetUser() {
  // run the query
  return useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
    staleTime: Infinity,
  });
}
