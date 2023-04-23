import { Song } from "./types";

function convertTrackToSong(track: SpotifyApi.PlaylistTrackObject): Song {
  const defaultValue = "unspecified";
  return {
    spotifyTrackId: track.track?.id || defaultValue,
    artist:
      track.track?.artists.map((artist) => artist.name).join(", ") ||
      defaultValue,
    title: track.track?.name || defaultValue,
    duration: track.track?.duration_ms || 0,
  };
}

export { convertTrackToSong };
