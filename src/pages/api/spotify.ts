export function authorizeUrl(location: Location) {
  const clientID = process.env.NEXT_PUBLIC_SPOTIFY_API_KEY;
  // Remove fragment from current url, in case there's a bad access token attached

  const redirectUri = `${location.href.match(/(^[^#?]*)/)?.[0]}connect/`;
  const scope = "playlist-read-private";
  return `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token`;
}

async function makeApiCall(url: string): Promise<unknown> {
  const accessToken = window.localStorage.getItem("spotify_access_token");
  const response = await fetch(url, {
    method: "get",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.json();
}

export async function getPlaylists(): Promise<SpotifyApi.ListOfUsersPlaylistsResponse> {
  const playlistsUrl = "https://api.spotify.com/v1/me/playlists";
  let data = (await makeApiCall(
    playlistsUrl
  )) as SpotifyApi.ListOfUsersPlaylistsResponse;
  return data;
}

export async function getPlaylistDetails(
  playlistId: string
): Promise<SpotifyApi.SinglePlaylistResponse> {
  const playlistDetailsUrl = `https://api.spotify.com/v1/playlists/${playlistId}`;
  const data = (await makeApiCall(
    playlistDetailsUrl
  )) as SpotifyApi.SinglePlaylistResponse;
  return data;
}
