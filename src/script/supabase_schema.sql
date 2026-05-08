CREATE TABLE IF NOT EXISTS playlists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS playlist_tracks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  playlist_id UUID REFERENCES playlists(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- 음악 정보 (Last.fm)
  album_name TEXT NOT NULL,
  artist_name TEXT NOT NULL,
  image_url TEXT,
  album_mbid TEXT,
  
  youtube_video_id TEXT UNIQUE,
  
  added_at TIMESTAMPTZ DEFAULT NOW()
);