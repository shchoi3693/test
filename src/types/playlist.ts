export interface Playlists {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
}

export interface Playlist_tracks {
  id: string;
  playlist_id: string;
  user_id: string;
  album_name: string;
  artist_name: string;
  image_url: string;
  album_mbid: string;
  youtube_video_id: string;
  added_at: string;
}

export type Playlist_track = Omit<Playlist_tracks, 'playlist_id'>;
