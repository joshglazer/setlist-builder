import Paper from "@mui/material/Paper";
import { Droppable } from "react-beautiful-dnd";
import SongDragAndDrop from "./SongDragAndDrop";
import { Set } from "./types";

interface SetEditorProps {
  index: number;
  set: Set;
}

export default function SetEditor({ index, set }: SetEditorProps): JSX.Element {
  return (
    <Paper>
      Set #{index + 1}
      <Droppable droppableId={`set-${index}`}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {!!set.songs.length ? (
              set.songs.map((song, index) => (
                <SongDragAndDrop
                  key={song.track?.id}
                  track={song.track}
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
