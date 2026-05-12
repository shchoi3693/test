'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Playlist } from '@/types/playlist';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { useAddTrack } from '@/hooks/useTrack';
import Image from 'next/image';
import { Itunes } from '@/types/itunes';

export default function Search() {
  const { userId } = useAuthStore();
  const { mutate: addTrack, isPending } = useAddTrack();
  const router = useRouter();
  const [query, setQuery] = useState<string>('');
  const [tracks, setTracks] = useState<Itunes[]>([]);
  const [isReset, setIsReset] = useState<boolean>(false);
  const [playlist, setPlaylist] = useState<Playlist[]>([]);
  const [videoId, setVideoId] = useState<string>('');

  const handlerSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value !== '') {
      setIsReset(true);
    } else {
      setIsReset(false);
    }
  };

  useEffect(() => {
    if (!query.trim()) {
      return;
    }
    const loadSearch = async () => {
      const res = await fetch(`/api/itunes?term=${query}`);
      const data = await res.json();
      setTracks(data.results);
    };
    loadSearch();
  }, [query]);

  const resetHandler = () => {
    setQuery('');
    setIsReset(false);
  };

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

  return (
    <div className="fixed w-50 right-0 p-2">
      <div className="w-full flex items-center border border-gray-400 rounded-sm relative">
        <input type="text" className="w-full px-2 py-0.5" value={query} onChange={handlerSearch} />
        {isReset && (
          <button
            type="reset"
            title="지우기"
            onClick={resetHandler}
            className="absolute right-1 top-0 bottom-0 mt-auto mb-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M16 8 L8 16"
                stroke="#686868"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 8L16 16"
                stroke="#686868"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
      {tracks &&
        (tracks.length === 0 && query.length > 1 ? (
          <div>no data</div>
        ) : (
          <ul>
            {tracks.map(track => {
              return (
                <li
                  key={track.trackId}
                  className="flex border border-gray-200"
                  onClick={() => handlerAddTrack(track)}
                >
                  <div className="relative shrink-0 w-10 h-10 border border-gray-200">
                    <Image fill src={track.artworkUrl100} alt={track.trackName} unoptimized />
                  </div>
                  <div className="flex">
                    <p className="text-sm p-3">{track.trackName}</p>
                    <p className="text-sm p-3">{track.artistName}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        ))}
    </div>
  );
}
