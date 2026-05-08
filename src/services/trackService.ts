import { createClient } from '@/lib/supabase/client';
import { Playlist_tracks, Playlist_track } from '@/types/playlist';
import { playlistService } from './playlistService';

const supabase = createClient();

export const trackService = {
  async addTrackToPlaylist({
    userId,
    newTrack,
  }: {
    userId: string;
    newTrack: any;
  }): Promise<Playlist_tracks> {
    const { data: playlist, error: pError } = await supabase
      .from('playlists')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();

    if (pError) throw new Error(pError.message);

    let targetPlaylistId: string;
    if (!playlist) {
      const newInitPlaylist = await playlistService.createPlaylist({
        userId,
        title: 'NEW Play',
      });
      targetPlaylistId = newInitPlaylist.id;
    } else {
      targetPlaylistId = playlist.id;
    }

    const { data, error } = await supabase
      .from('playlist_tracks')
      .insert([{ ...newTrack, playlist_id: targetPlaylistId }])
      .select('*, playlists(*)')
      .single();
    if (error) throw new Error(error.message);

    return data as Playlist_tracks;
  },
};
