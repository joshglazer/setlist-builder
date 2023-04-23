import Paper from "@mui/material/Paper";
import prettyMilliseconds from "pretty-ms";
import { useCallback } from "react";
import { Droppable } from "react-beautiful-dnd";
import SongDragAndDrop from "./SongDragAndDrop";
import { Set } from "./types";

interface SetEditorProps {
  index: number;
  set: Set;
}

export default function SetEditor({ index, set }: SetEditorProps): JSX.Element {
  const getSetDuration = useCallback(() => {
    console.log(set);
    const initialValue = 0;
    return set.songs.reduce(
      (accumulator, currentValue) => accumulator + currentValue.duration,
      initialValue
    );
  }, [set]);

  return (
    <Paper sx={{ marginBottom: "2em" }}>
      <div>Set #{index + 1}</div>
      <div>
        {prettyMilliseconds(getSetDuration(), { secondsDecimalDigits: 0 })}
      </div>
      <Droppable droppableId={`set-${index}`}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {!!set.songs.length ? (
              set.songs.map((song, index) => (
                <SongDragAndDrop
                  key={song.spotifyTrackId}
                  song={song}
                  index={index}
                />
              ))
            ) : (
              <div>Drag and drop songs here</div>
            )}
          </div>
        )}
      </Droppable>
    </Paper>
  );
}
