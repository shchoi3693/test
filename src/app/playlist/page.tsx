import Search from '@/components/search/Search';
import Turntable from '@/components/turntable/Turntable';
import AlbumCoverList from '@/components/AlbumCoverList';

export default function Playlist() {
  return (
    <div>
      <Search />
      <AlbumCoverList />
      {/* <Turntable /> */}
    </div>
  );
}
