import DragIndicatorOutlinedIcon from "@mui/icons-material/DragIndicatorOutlined";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Draggable } from "react-beautiful-dnd";

interface SongProps {
  track: SpotifyApi.TrackObjectFull | null;
  index: number;
}

export default function SongDragAndDrop({ track, index }: SongProps) {
  if (!track) {
    return <></>;
  }

  const { id, name, artists, duration_ms } = track;
  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card variant="outlined">
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <DragIndicatorOutlinedIcon />
              <Box>
                <div>{name}</div>
                <div>{artists.map((artist) => artist.name).join(", ")}</div>
              </Box>
              {snapshot.isDragging && "on the move"}
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  );
}
