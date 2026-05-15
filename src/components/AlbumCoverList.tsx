'use client';

import { usePlaylist } from '@/hooks/usePlaylist';
import { usePlaylistTrack } from '@/hooks/useTrack';
import { useAuthStore } from '@/store/useAuthStore';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';
import AlbumCover from './AlbumCover';

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
  const containerRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(2);
  const x = useMotionValue(0);
  const albumSize = 160;

  if (isPending) return <div>0 Loading</div>;
  if (isPlaylistError || isTracksError) return <>Error</>;
  if (isTracksLoading) return <>2 Loading</>;
  if (!tracks || tracks.length === 0) return <>0 Plyalist</>;

  const maxDragLeft = -(tracks.length - 1) * albumSize;

  const centerItem = (index: number) => {
    setSelectedIndex(index);

    animate(x, albumSize * -index, {
      type: 'spring',
      stiffness: 200,
      damping: 20,
      mass: 0.8,
    });
  };

  return (
    <div className="overflow-hidden absolute inset-0 border border-gray-300">
      <div
        ref={containerRef}
        className="absolute inset-0 my-auto mx-[20vw] bg-gray-50 -rotate-45 border border-gray-300"
      >
        <motion.div
          drag="x"
          className="w-max flex items-center cursor-grab absolute inset-0 m-auto"
          style={{ x }}
          //dragConstraints={containerRef}
          //dragElastic={1}
          dragConstraints={{ left: maxDragLeft, right: 0 }}
          dragElastic={0.2}
        >
          {tracks.map((track, index) => (
            <AlbumCover
              key={track.id}
              totalTracks={tracks.length}
              track={track}
              index={index}
              selectedIndex={selectedIndex}
              x={x}
              onClick={() => centerItem(index)}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
