'use client';

import { useAddTrack } from '@/hooks/useTrack';

export default function VinylRecord() {
  const { mutate: addTrack, isPending } = useAddTrack();

  const searchVideoQuery = 'test';
  return isPending ? (
    <div>
      <div>test</div>
    </div>
  ) : (
    <>
      <div>
        {
          // <iframe
          //   width="560"
          //   height="315"
          //   src={`https://www.youtube.com/embed/${searchVideoQuery}`}
          //   title="YouTube video player"
          // />
        }
      </div>
    </>
  );
}
