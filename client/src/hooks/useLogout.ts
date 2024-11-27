import { useQueryClient, useMutation } from '@tanstack/react-query';

// login mutation
export function useLogout() {
  // get the query client
  const queryClient = useQueryClient();
  // create the mutation
  return useMutation({
    mutationFn: () => {
      return;
    },
    onSuccess: () => {
      queryClient.setQueryData(['user'], false);
    },
  });
}
