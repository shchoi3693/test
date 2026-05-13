'use client';

import { usePlaylist } from '@/hooks/usePlaylist';
import { usePlaylistTrack } from '@/hooks/useTrack';
import { useAuthStore } from '@/store/useAuthStore';
import Image from 'next/image';

export default function AlbumCoverList() {
  const { userId } = useAuthStore();
  const { data: playlists, isPending, isError: isPlaylistError } = usePlaylist(userId);
  const playlistId = playlists?.[0]?.id || null;

  const {
    data: tracks,
    isLoading: isTracksLoading,
    isError: isTracksError,
    isStale,
  } = usePlaylistTrack({ user_id: userId, playlist_id: playlistId });

  if (isPending) return <div>0 Loading</div>;
  if (isPlaylistError || isTracksError) return <>Error</>;
  if (isTracksLoading) return <>2 Loading</>;
  if (!tracks || tracks.length === 0) return <>0 Plyalist</>;

  console.log(tracks);

  return (
    <ul>
      {tracks.map(track => (
        <li key={track.id}>
          <div className="relative shrink-0 w-10 h-10 border border-gray-200">
            {/* <Image fill src={track.image_url} alt={track.album_name} unoptimized /> */}
          </div>
          <p className="text-sm">{track.album_name}</p>
        </li>
      ))}
    </ul>
  );
}
