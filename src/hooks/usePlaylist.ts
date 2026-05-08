import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { playlistService } from '@/services/playlistService';

export const usePlaylists = (userId: string | null) => {
  return useQuery({
    queryKey: ['playlists', userId],
    queryFn: () => playlistService.getPlaylist(userId!),
    enabled: !!userId,
  });
};

export const useCreatePlaylist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: playlistService.createPlaylist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playlist'] });
    },
  });
};
