import { Setlist } from "@/components/SetlistEditor";
import SetlistEditor from "@/components/SetlistEditor/SetlistEditor";
import { decompressFromEncodedURIComponent } from "lz-string";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SetlistCreateFromPlaylist(): JSX.Element {
  const router = useRouter();
  const { encryptedPlaylistObject } = router.query;

  const [setlist, setSetlist] = useState<Setlist>();

  useEffect(() => {
    if (encryptedPlaylistObject) {
      setSetlist(
        JSON.parse(
          decompressFromEncodedURIComponent(encryptedPlaylistObject as string)
        ) as Setlist
      );
    }
  }, [encryptedPlaylistObject]);

  if (!setlist) {
    return <div>...Loading</div>;
  }

  return (
    <div>
      <SetlistEditor initialSetlist={setlist} />
    </div>
  );
}
