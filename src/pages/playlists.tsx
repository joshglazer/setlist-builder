import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
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

  function renderPlaylist(
    playlist: SpotifyApi.PlaylistObjectSimplified
  ): JSX.Element {
    console.log(playlist);
    return (
      <Link href={`/setlist/create/${playlist.id}`} key={playlist.id}>
        <Card
          variant="outlined"
          sx={{ display: "flex", alignItems: "center", p: 0, mb: "1em" }}
        >
          <CardMedia
            component="img"
            sx={{ height: "100px", width: "100px" }}
            image={playlist.images[0].url}
            alt={`Image of ${playlist.name}`}
          />
          <CardContent>
            <Typography variant="body1">{playlist.name}</Typography>
            <Typography variant="body2">
              {playlist.tracks.total} Songs
            </Typography>
          </CardContent>
        </Card>
      </Link>
    );
  }

  if (!playlists) {
    return <Container>...Loading</Container>;
  }

  return (
    <Container>
      <Typography variant="body1">
        Now that you&apos;ve connected your account, click one of your playlists
        to make a setlist using its tracks.
      </Typography>
      <Box>{playlists.items.map(renderPlaylist)}</Box>
    </Container>
  );
}
