'use client';

import { usePlaylists } from '@/hooks/usePlaylist';
import { useAuthStore } from '@/store/useAuthStore';

export default function PlaylistList() {
  const { userId } = useAuthStore();
  const { data: playlists, isLoading, isError } = usePlaylists(userId);

  if (isLoading) return <>Loading</>;

  if (isError) return <>Error</>;

  if (!playlists || playlists.length === 0) return <>0</>;

  console.log(playlists);

  return (
    <ul>
      {playlists.map((playlist, idx) => (
        <li key={idx}>{playlist.title}</li>
      ))}
    </ul>
  );
}
