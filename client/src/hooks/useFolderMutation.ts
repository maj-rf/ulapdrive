import { useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createFolder, deleteFolder, updateFolderName } from '@/services/folderService';

export const useCreateFolder = (userId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders', { userId }] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteFolder = (userId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders', { userId }] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateFolder = (userId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateFolderName,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders', { userId }] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
