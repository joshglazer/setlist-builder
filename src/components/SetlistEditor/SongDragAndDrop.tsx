import DragIndicatorOutlinedIcon from "@mui/icons-material/DragIndicatorOutlined";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Draggable } from "react-beautiful-dnd";
import { Song } from "./types";
import prettyMilliseconds from "pretty-ms";

interface SongProps {
  song: Song;
  index: number;
}

export default function SongDragAndDrop({ song, index }: SongProps) {
  const { spotifyTrackId, title, artist, duration } = song;
  return (
    <Draggable key={spotifyTrackId} draggableId={spotifyTrackId} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card variant="outlined">
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <DragIndicatorOutlinedIcon />
              <Box sx={{ px: 2 }}>
                <div>{title}</div>
                <div>{artist}</div>
              </Box>
              <Box sx={{ ml: "auto" }}>
                {prettyMilliseconds(duration, { secondsDecimalDigits: 0 })}
              </Box>
              {/* {snapshot.isDragging && "on the move"} */}
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  );
}
