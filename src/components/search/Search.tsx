'use client';

import { useState } from 'react';
import SearchInput from './SearchInput';
import SearchResult from './SearchResult';
import { useAuthStore } from '@/store/useAuthStore';
import { useSearchTracks } from '@/hooks/useSearch';
import { useAddTrack } from '@/hooks/useTrack';
import { useRouter } from 'next/navigation';
import { Itunes } from '@/types/itunes';

export default function Search() {
  const { userId } = useAuthStore();
  const [query, setQuery] = useState('');
  const { data, isLoading: isSearchLoading } = useSearchTracks(query);
  const tracks = data?.results || [];
  const { mutate: addTrack, isPending: isAddTrackPending } = useAddTrack();
  const router = useRouter();
  const [videoId, setVideoId] = useState<string>('');

  const handlerReset = () => setQuery('');
  const handlerAddTrack = (track: Itunes) => {
    if (!userId) {
      router.push('/login');
      return;
    }

    addTrack(
      { userId, track },
      {
        onSuccess: data => {
          setVideoId(data.youtube_video_id);
        },
      },
    );
  };

  if (isAddTrackPending) return <>pending</>;

  return (
    <div className="fixed w-50 right-0 p-2 z-100">
      <SearchInput value={query} onChange={e => setQuery(e.target.value)} onReset={handlerReset} />
      <SearchResult
        query={query}
        tracks={tracks}
        isLoading={isSearchLoading}
        onAddTrack={handlerAddTrack}
      />
    </div>
  );
}
