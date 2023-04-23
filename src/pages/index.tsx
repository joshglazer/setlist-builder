import SetlistEditor from "@/components/SetlistEditor/SetlistEditor";
import styles from "@/styles/Home.module.css";
import { Button } from "@mui/material";
import { Inter } from "next/font/google";
import Head from "next/head";
import { authorizeUrl } from "./api/spotify";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  function handleSpotifyAuthorization() {
    window.location.replace(authorizeUrl(location));
  }

  return (
    <>
      <Head>
        <title>Setlist Builder</title>
        <meta
          name="description"
          content="This is a tool that can be used to build a setlist"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}>
          <Button onClick={handleSpotifyAuthorization}>
            Connect Spotify Account
          </Button>
        </div>
      </main>
    </>
  );
}
