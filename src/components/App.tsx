import React from 'react';
import {ThemeProvider} from 'styled-components';
import GlobalStyle from '../themes/global-style';
import {theme} from '../themes/themes';
import Home from './pages/home/Home';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Home />
    </ThemeProvider>
  );
}

export default App;
