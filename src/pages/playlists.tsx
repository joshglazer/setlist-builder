import Link from "next/link";
import { useEffect, useState } from "react";
import { getPlaylists } from "./api/spotify";

export default function Playlists(): JSX.Element {
  const [playlists, setPlaylists] =
    useState<SpotifyApi.ListOfUsersPlaylistsResponse>();

  useEffect(() => {
    getPlaylists().then((playlistsResponse) => {
      setPlaylists(playlistsResponse);
    });
  }, []);

  if (!playlists) {
    return <div>...Loading</div>;
  }

  return (
    <div>
      {playlists.items.map((playlist) => (
        <Link href={`/setlist/create/${playlist.id}`} key={playlist.id}>
          {playlist.name}
        </Link>
      ))}
    </div>
  );
}
