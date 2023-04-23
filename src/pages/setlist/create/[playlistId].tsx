import { convertTrackToSong, Setlist } from "@/components/SetlistEditor";
import SetlistEditor from "@/components/SetlistEditor/SetlistEditor";
import { getPlaylistDetails } from "@/pages/api/spotify";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SetlistCreateFromPlaylist(): JSX.Element {
  const router = useRouter();
  const { playlistId } = router.query;

  const [setlist, setSetlist] = useState<Setlist>();

  useEffect(() => {
    if (playlistId) {
      getPlaylistDetails(playlistId as string).then(
        (playlistDetailsResponse) => {
          const setlistFromPlaylist: Setlist = {
            title: "My Setlist",
            sets: [
              {
                songs: [],
              },
            ],
            availableSongs:
              playlistDetailsResponse.tracks.items.map(convertTrackToSong),
          };
          setSetlist(setlistFromPlaylist);
        }
      );
    }
  }, [playlistId]);

  if (!setlist) {
    return <div>...Loading</div>;
  }

  return (
    <div>
      <SetlistEditor initialSetlist={setlist} />
    </div>
  );
}
