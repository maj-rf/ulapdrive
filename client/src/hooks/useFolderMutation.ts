import { useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createFolder, deleteFolder, updateFolderName } from '@/services/folderService';
export const useFolderMutation = (userId: number) => {
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
      queryClient.invalidateQueries({ queryKey: ['folders', { userId }] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const update = useMutation({
    mutationFn: updateFolderName,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders', { userId }] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { create, remove, update };
};
