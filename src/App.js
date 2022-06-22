import { Container, createTheme, ThemeProvider } from "@mui/material";
import MainRouter from "./router";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <MainRouter />
      </Container>
    </ThemeProvider>
  );
}

export default App;
