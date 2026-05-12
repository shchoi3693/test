'use client';

import { usePlaylist } from '@/hooks/usePlaylist';
import { usePlaylistTrack } from '@/hooks/useTrack';
import { useAuthStore } from '@/store/useAuthStore';

export default function PlaylistList() {
  const { userId } = useAuthStore();
  const {
    data: playlists,
    isLoading: isPlaylistLoading,
    isError: isPlaylistError,
  } = usePlaylist(userId);
  const playlistId = playlists && playlists.length > 0 ? playlists[0].id : null;
  console.log(userId, playlistId);
  const {
    data: tracks,
    isLoading: isTracksLoading,
    isError: isTracksError,
    isStale,
  } = usePlaylistTrack({ user_id: userId, playlist_id: playlistId });

  if (isPlaylistLoading || isTracksLoading) return <>Loading</>;
  if (isPlaylistError || isTracksError) return <>Error</>;
  if (!tracks || tracks.length === 0) return <>0</>;

  console.log(tracks);

  return (
    <ul>
      {tracks.map((track, idx) => (
        <li key={idx}>{track.album_name}</li>
      ))}
    </ul>
  );
}
