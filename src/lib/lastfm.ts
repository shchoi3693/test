const API_KEY = process.env.NEXT_PUBLIC_LASTFM_API_KEY;
const BASE_URL = 'https://ws.audioscrobbler.com/2.0/';

export const getAlbums = async (artist: string) => {
  if (!API_KEY) {
    throw new Error('Lastfm Key Error');
  }
  const params = new URLSearchParams({
    method: 'artist.gettopalbums',
    artist,
    api_key: API_KEY,
    format: 'json',
    limit: '5',
  });
  const res = await fetch(`${BASE_URL}?${params.toString()}`);

  if (!res.ok) throw new Error(`Network Error ${res.status}`);

  const data = await res.json();

  if (data.error) {
    if (data.error === 6) {
      return [];
    }
    throw new Error(data.message);
  }

  return data.topalbums.album;
};
