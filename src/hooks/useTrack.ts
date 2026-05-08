import { trackService } from '@/services/trackService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddTrack = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: trackService.addTrackToPlaylist,
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: ['playlist_tracks', data.playlist_id],
      });

      queryClient.invalidateQueries({
        queryKey: ['playlists'],
      });
    },
  });
};
