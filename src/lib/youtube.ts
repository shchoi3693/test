const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

export const getVideo = async (q: string) => {
  if (!API_KEY) {
    throw new Error('Youtube Key Error');
  }
  const params = new URLSearchParams({
    part: 'snippet',
    q,
    maxResults: '1',
    type: 'video',
    key: API_KEY,
  });
  const res = await fetch(`${BASE_URL}?${params.toString()}`);
  if (!res.ok) throw new Error(`Error Youtube ${res.status}`);
  const data = await res.json();
  return data.items[0].id.videoId;
};
