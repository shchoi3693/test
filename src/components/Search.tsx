'use client';

import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { getAlbums } from '@/lib/lastfm';
import { getVideo } from '@/lib/youtube';
import { Album, Track } from '@/types/lastfm';
import { Playlists } from '@/types/playlist';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { useAddTrack } from '@/hooks/useTrack';

export default function Search() {
  const { userId } = useAuthStore();
  const { mutate: addTrack, isPending } = useAddTrack();
  const router = useRouter();
  const [query, setQuery] = useState<string>('');
  const [albums, setAlbums] = useState<Track[]>([]);
  const [isReset, setIsReset] = useState<boolean>(false);
  const [playlists, setPlaylists] = useState<Playlists[]>([]);
  const [videoId, setVideoId] = useState<string>('');

  const searchAlbumsHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value !== '') {
      setIsReset(true);
    } else {
      setIsReset(false);
    }
  };
  useEffect(() => {
    const loadAlbums = async () => {
      try {
        const data = await getAlbums(query);
        setAlbums(data);
      } catch (error) {
        console.error('Search Albums Error', error);
      }
    };
    loadAlbums();
  }, [query]);

  const resetHandler = () => {
    setQuery('');
    setIsReset(false);
  };

  const AddTrackhandler = ({
    album_name,
    artist_name,
  }: {
    album_name: string;
    artist_name: string;
  }) => {
    if (!userId) {
      console.log('login ');
      //router.push('/login');
      return;
    }

    setVideoId('test');

    addTrack({
      userId: userId,
      newTrack: {
        album_name,
        artist_name,
        youtube_video_id: 'test',
      },
    });

    // const loadVideo = async () => {
    //   try {
    //     const data = await getVideo(`${artist} ${name}`);
    //     setVideoId(data);
    //     console.log(data);
    //   } catch (error) {
    //     console.error('Search Ytb Error', error);
    //   }
    // };
    // loadVideo();
  };

  //const data = await getVideo(searchVideoQuery.current);

  return (
    <div className="fixed w-m">
      <div className="w-full flex items-center border border-gray-400 rounded-sm relative">
        <input type="text" className="px-2 py-0.5" value={query} onChange={searchAlbumsHandler} />
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
      {albums.length === 0 && query.length > 1 ? (
        <div>sdf</div>
      ) : (
        <ul>
          {albums.map((album, idx) => {
            return (
              <li
                key={album.name + idx}
                className="border border-gray-200"
                onClick={() =>
                  AddTrackhandler({ album_name: album.name, artist_name: album.artist.name })
                }
              >
                <p className="text-sm p-3">{album.name}</p>
              </li>
            );
          })}
        </ul>
      )}
      {videoId && (
        <div>test</div>
        // <div>
        //   {
        //     <iframe
        //       width="560"
        //       height="315"
        //       src={`https://www.youtube.com/embed/${searchVideoQuery}`}
        //       title="YouTube video player"
        //     />
        //   }
        // </div>
      )}
    </div>
  );
}
