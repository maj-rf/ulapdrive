import { useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createFolder, deleteFolder } from '@/services/folderService';
export const useFolderMutation = (userId: number | null = null) => {
  const queryClient = useQueryClient();
  const create = useMutation({
    mutationFn: createFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders', { userId }] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const remove = useMutation({
    mutationFn: deleteFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { create, remove };
};
