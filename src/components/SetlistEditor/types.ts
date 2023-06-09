interface Setlist {
  title: string;
  date?: Date;
  sets: Set[];
  unusedSongs: Song[];
}

interface Set {
  songs: Song[];
}

interface Song {
  spotifyTrackId: string;
  artist: string;
  title: string;
  duration: number;
}

export { type Setlist, type Set, type Song };
