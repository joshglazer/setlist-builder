import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import { compressToEncodedURIComponent } from "lz-string";
import { useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useCopyToClipboard } from "usehooks-ts";
import SetEditor from "./SetEditor";
import SongDragAndDrop from "./SongDragAndDrop";
import { Set, Setlist, Song } from "./types";
interface SetlistEditorProps {
  initialSetlist: Setlist;
}

export default function SetlistEditor({
  initialSetlist,
}: SetlistEditorProps): JSX.Element {
  const [setlist, setSetlist] = useState<Setlist>(initialSetlist);
  const [_value, copy] = useCopyToClipboard();
  const [isCopySnackbarOpen, setIsCopySnackbarOpen] = useState<boolean>(false);

  function renderSet(set: Set, index: number): JSX.Element {
    return <SetEditor key={index} index={index} set={set} />;
  }

  function renderSetlists(): JSX.Element {
    return <div>{setlist.sets.map(renderSet)}</div>;
  }

  function addSetlist() {
    const newSetlist = structuredClone(setlist);
    setSetlist({
      ...newSetlist,
      sets: [...newSetlist.sets, { songs: [] }],
    });
  }

  function renderAvailableSongs() {
    return (
      <>
        <Droppable droppableId="available">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {setlist.availableSongs.map((availableSong, index) => (
                <SongDragAndDrop
                  key={availableSong.spotifyTrackId}
                  song={availableSong}
                  index={index}
                />
              ))}
            </div>
          )}
        </Droppable>
      </>
    );
  }

  function getSetlistIndexFromContainerId(setlistContainerId: string) {
    const setlistIndex = +setlistContainerId.split("-")[1];
    return setlistIndex;
  }

  function moveSong(
    sourceId: string,
    sourceIndex: number,
    destinationId: string,
    destinationIndex: number
  ): void {
    let song: Song | null = null;
    const newSetlist = structuredClone(setlist);

    if (sourceId === "available") {
      song = setlist.availableSongs[sourceIndex];
      if (song) {
        newSetlist.availableSongs.splice(sourceIndex, 1);
      }
    } else if (sourceId.startsWith("set-")) {
      const setIndex = getSetlistIndexFromContainerId(sourceId);
      song = setlist.sets[setIndex].songs[sourceIndex];
      newSetlist.sets[setIndex].songs.splice(sourceIndex, 1);
    }

    if (song !== null) {
      if (destinationId.startsWith("set-")) {
        const setIndex = getSetlistIndexFromContainerId(destinationId);
        newSetlist.sets[setIndex].songs.splice(destinationIndex, 0, song);
      } else if (sourceId.startsWith("available")) {
        newSetlist.availableSongs.splice(destinationIndex, 0, song);
      }
    }
    setSetlist(newSetlist);
  }

  function onDragEnd(result: DropResult) {
    const { source, destination } = result;
    if (destination) {
      moveSong(
        source.droppableId,
        source.index,
        destination.droppableId,
        destination.index
      );
    }
  }

  function copyLink(): void {
    let url = `${window.location.protocol}//${
      window.location.host
    }/setlist/edit/${compressToEncodedURIComponent(JSON.stringify(setlist))}`;
    copy(url);
    setIsCopySnackbarOpen(true);
  }

  function handleCopySnackbarClosed(
    _event: React.SyntheticEvent | Event,
    _reason?: string
  ): void {
    setIsCopySnackbarOpen(false);
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", pb: 3 }}>
        <Typography variant="h6">{setlist.title}</Typography>
        <Button variant="contained" onClick={copyLink}>
          Copy Link to Share
        </Button>
        <Snackbar
          open={isCopySnackbarOpen}
          autoHideDuration={5000}
          onClose={handleCopySnackbarClosed}
          message="Setlist link copied to clipboard"
        />
      </Box>
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {renderSetlists()}
            <Button variant="contained" onClick={addSetlist}>
              Add Set
            </Button>
          </Grid>
          <Grid item xs={6}>
            {renderAvailableSongs()}
          </Grid>
        </Grid>
      </DragDropContext>
    </>
  );
}
