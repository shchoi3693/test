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
  album_name TEXT NOT NULL,
  artist_name TEXT NOT NULL,
	title TEXT NOT NULL,
  image_url TEXT,
  youtube_video_id TEXT,
  added_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE playlist_tracks 
ADD CONSTRAINT unique_playlist_track UNIQUE (playlist_id, youtube_video_id);

ALTER TABLE playlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE playlist_tracks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own playlists" 
ON playlists FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own playlists" 
ON playlists FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own playlists" 
ON playlists FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own tracks" 
ON playlist_tracks FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tracks" 
ON playlist_tracks FOR DELETE USING (auth.uid() = user_id);
