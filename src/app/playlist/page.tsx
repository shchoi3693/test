import React from 'react';
import Search from '@/components/Search';
import PlaylistList from '@/components/PlaylistList';
import VinylRecord from '@/components/VinylRecord';

export default function Playlist() {
  return (
    <div>
      <Search />
      <PlaylistList />
      <VinylRecord />
    </div>
  );
}
