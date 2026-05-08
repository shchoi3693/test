import React from 'react';
import Search from '@/components/Search';
import PlaylistList from '@/components/PlaylistList';

export default function Playlists() {
  return (
    <div>
      <PlaylistList />
      <Search />
    </div>
  );
}
