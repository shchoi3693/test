import { trackService } from '@/services/trackService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Itunes } from '@/types/itunes';

export const usePlaylistTrack = ({
  user_id,
  playlist_id,
}: {
  user_id: string | null;
  playlist_id: string | null;
}) => {
  return useQuery({
    queryKey: ['playlist', playlist_id, 'track', user_id],
    queryFn: () =>
      trackService.getTrackToPlaylist({ user_id: user_id!, playlist_id: playlist_id! }),
    enabled: !!playlist_id, // ID가 있을 때만 실행
  });
};

export const useAddTrack = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, track }: { userId: string; track: Itunes }) => {
      const searchQuery = `${track.trackName} ${track.artistName} official`;
      const ytbRes = await fetch(`/api/youtube?q=${encodeURIComponent(searchQuery)}`);
      if (!ytbRes.ok) throw new Error('ytbApi error');
      const ytbData = await ytbRes.json();
      //const ytbId = ytbData.id?.videoId;
      const ytbId = 'test22';

      return trackService.addTrackToPlaylist({
        userId,
        newTrack: {
          album_name: track.collectionName,
          artist_name: track.artistName,
          title: track.trackName,
          image_url: track.artworkUrl100,
          youtube_video_id: ytbId,
        },
      });
    },

    onError: (error: any) => {
      if (error.code === '23505') {
        console.log('id unique toast');
      }
    },

    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: ['playlist', 'track', data.playlist_id],
      });

      queryClient.invalidateQueries({
        queryKey: ['playlist'],
      });
    },
  });
};
