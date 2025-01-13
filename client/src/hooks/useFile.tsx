import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as fileService from '../services/fileService';
import { toast } from 'sonner';

export const useFiles = (folderId: string) =>
  useQuery({
    queryFn: () => fileService.getFilesFromFolder(folderId),
    queryKey: ['files', { folderId }],
  });

export const useFileUpload = (folderId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fileService.uploadFileToFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files', { folderId }] });
      toast.success('File uploaded!');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteFile = (folderId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fileService.deleteFileFromFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files', { folderId }] });
      toast.success('File deleted!');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
