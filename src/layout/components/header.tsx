import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export default function Header() {
  return (
    <AppBar
      position="static"
      color="default"
      elevation={1}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: "wrap" }} disableGutters={true}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            <Link href="/">Setlist Builder</Link>
          </Typography>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
