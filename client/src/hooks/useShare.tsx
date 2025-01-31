import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import * as shareServices from '../services/shareService';
import { toast } from 'sonner';

export const useCreateLink = (folderId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: shareServices.createLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shared', { folderId }] });
      toast.success('Link created');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useRemoveLink = (folderId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: shareServices.removeLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shared', { folderId }] });
      toast.success('Link deleted');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetLink = (folderId: string) => {
  return useQuery({
    queryKey: ['shared', { folderId }],
    queryFn: () => shareServices.getLink(folderId),
  });
};
