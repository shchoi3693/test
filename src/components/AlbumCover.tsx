'use client';

import { usePlaylist } from '@/hooks/usePlaylist';
import { usePlaylistTrack } from '@/hooks/useTrack';
import { useAuthStore } from '@/store/useAuthStore';
import { Itunes } from '@/types/itunes';
import { PlaylistTrack } from '@/types/playlist';
import { motion, MotionValue, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';

interface Props {
  track: PlaylistTrack | undefined;
  totalTracks: number;
  index: number;
  selectedIndex: number;
  x: MotionValue<number>;
  onClick: () => void;
}

export default function AlbumCover({
  track,
  totalTracks,
  index,
  selectedIndex,
  x,
  onClick,
}: Props) {
  const albumSize = 160;
  const centerRange = index * -albumSize;
  const scale = useTransform(
    x,
    [centerRange - albumSize, centerRange, centerRange + albumSize],
    [0.6, 1, 0.8],
  );
  const trackIndex = totalTracks - index;
  const zIndex = useTransform(
    x,
    [centerRange - albumSize, centerRange, centerRange + albumSize],
    [trackIndex, 100, trackIndex],
  );

  return (
    <motion.div
      className="w-40 h-40 border border-gray-200 shrink-0 rotate-45 bg-gray-50"
      onClick={onClick}
      style={{ scale, zIndex }}
    >
      <div className="relative shrink-0 w-10 h-10 border border-gray-200 ">
        {/* <Image fill src={track.image_url} alt={track.album_name} unoptimized /> */}
      </div>
      <p className="text-sm">
        {track?.album_name.substring(0, 8)} {index}...
      </p>
      <Link href="/turntable" className="px-4 border border-gray-300">
        T
      </Link>
    </motion.div>
  );
}
