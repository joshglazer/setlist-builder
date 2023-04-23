import Header from "./components/header";
import Footer from "./components/footer";
import { ReactNode } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />

      <Container component="main" maxWidth="lg" sx={{ py: 3 }}>
        {children}
      </Container>
      <Footer />
    </Box>
  );
}
