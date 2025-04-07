import React from 'react';
import { CssBaseline, ThemeProvider, createTheme, Container, Typography } from '@mui/material';
import ServiceList from './components/ServiceList';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Sistema de Atendimento ao Cliente
        </Typography>
        <ServiceList />
      </Container>
    </ThemeProvider>
  );
}

export default App;
