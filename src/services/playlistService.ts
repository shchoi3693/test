import { createClient } from '@/lib/supabase/client';
import { Playlists } from '@/types/playlist';

const supabase = createClient();

export const playlistService = {
  async getPlaylist(userId: string): Promise<Playlists[]> {
    const { data, error } = await supabase
      .from('playlists')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data as Playlists[];
  },

  async createPlaylist({ userId, title }: { userId: string; title: string }): Promise<Playlists> {
    const { data, error } = await supabase
      .from('playlists')
      .insert([{ user_id: userId, title: title }])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Playlists;
  },
};
