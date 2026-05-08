export interface Track {
  name: string;
  playcount: number;
  mbid?: string;
  url: string;
  artist: ArtistClass;
  image: Image[];
  '@attr': Attr;
}

export interface Attr {
  rank: string;
}

export interface ArtistClass {
  name: Name;
  mbid: string;
  url: string;
}

export enum Name {
  Test = 'Test',
}

export interface Image {
  '#text': string;
  size: Size;
}

export enum Size {
  Extralarge = 'extralarge',
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
}

export interface Album {
  name: string;
  artist: Artist;
  tracks: TrackElement[];
}

export interface Artist {
  name: string;
  founded: number;
  members: string[];
}

export interface TrackElement {
  name: string;
  duration: number;
}
