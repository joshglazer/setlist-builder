import SetlistEditor from "@/components/SetlistEditor/SetlistEditor";
import styles from "@/styles/Home.module.css";
import { Box, Button, Container, Typography } from "@mui/material";
import { Inter } from "next/font/google";
import Head from "next/head";
import { authorizeUrl } from "./api/spotify";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  function handleSpotifyAuthorization() {
    window.location.replace(authorizeUrl(location));
  }

  return (
    <Box>
      <Typography variant="h5">
        Get started with the Setlist Builder!
      </Typography>
      <Typography variant="body1">
        This is a tool that helps you build a setlist based on a playlist that
        you have created or subscribed to with your spotify account.
      </Typography>
      <Typography variant="body1">
        To get started, click the button below.
      </Typography>
      <Button
        onClick={handleSpotifyAuthorization}
        color="primary"
        variant="contained"
      >
        Connect Spotify Account
      </Button>
    </Box>
  );
}
