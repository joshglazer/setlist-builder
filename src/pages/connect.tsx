import { useEffect, useState } from "react";
import queryString from "query-string";
import { useRouter } from "next/navigation";

export default function Connect() {
  const router = useRouter();

  useEffect(() => {
    const parsedHash = queryString.parse(window.location.hash);
    let accessToken: string;
    if (parsedHash["access_token"]) {
      accessToken = parsedHash["access_token"] as string;
      console.log(accessToken);
      window.localStorage.setItem("spotify_access_token", accessToken);
      router.push("/playlists");
    }
  }, [router]);

  return <div>Connecting to Spotify ... Sit Tight!</div>;
}
