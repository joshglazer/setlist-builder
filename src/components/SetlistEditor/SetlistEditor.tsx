import { Button, Grid } from "@mui/material";
import { useState } from "react";
import { Set, Setlist } from "./types";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import SetEditor from "./SetEditor";
import SongDragAndDrop from "./SongDragAndDrop";

interface SetlistEditorProps {
  initialSetlist: Setlist;
}

export default function SetlistEditor({
  initialSetlist,
}: SetlistEditorProps): JSX.Element {
  const [setlist, setSetlist] = useState<Setlist>(initialSetlist);

  function renderSet(set: Set, index: number): JSX.Element {
    return <SetEditor key={index} index={index} set={set} />;
  }

  function renderSetlists(): JSX.Element {
    return <div>{setlist.sets.map(renderSet)}</div>;
  }

  function addSetlist() {
    setSetlist({
      ...setlist,
      sets: [...setlist.sets, { songs: [] }],
    });
  }

  function renderAvailableSongs() {
    return (
      <>
        <div>{setlist.title}</div>
        <Droppable droppableId="available">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {setlist.availableSongs.map((availableSong, index) => (
                <SongDragAndDrop
                  key={availableSong.track?.id}
                  track={availableSong.track}
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
  ) {
    let song: SpotifyApi.PlaylistTrackObject | null = null;
    const newSetlist = { ...setlist };

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
    console.log(result);
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

  return (
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
  );
}
