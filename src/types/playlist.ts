export interface Playlist {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
}

export interface PlaylistTrack {
  id: string;
  playlist_id: string;
  user_id: string;
  album_name: string;
  artist_name: string;
  title: string;
  image_url: string;
  youtube_video_id: string;
  added_at: string;
}
