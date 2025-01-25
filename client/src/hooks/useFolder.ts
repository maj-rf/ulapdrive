import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  createFolder,
  deleteFolder,
  updateFolderName,
  getRootFolders,
} from '@/services/folderService';
import type { Folder } from '@/types/types';

export const useCreateFolder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] });
      toast.success('Folder created');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteFolder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] });
      toast.success('Folder deleted');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateFolder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateFolderName,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useFolders = <TData = Folder[]>(select?: (data: Folder[]) => TData) =>
  useQuery({
    queryKey: ['folders'],
    queryFn: getRootFolders,
    throwOnError: true,
    select,
  });

export const useSingleFolder = (folderId: string) => {
  return useFolders((data) => data.find((f) => f.id === folderId));
};
