interface Setlist {
  title: string;
  date?: Date;
  sets: Set[];
  availableSongs: SpotifyApi.PlaylistTrackObject[];
}

interface Set {
  songs: SpotifyApi.PlaylistTrackObject[];
}

interface Song {
  artist: string;
  title: string;
  length: number;
}

export { type Setlist, type Set, type Song };
