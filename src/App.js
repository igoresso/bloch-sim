import React from 'react'
import { useSelector } from 'react-redux';
import {
  createMuiTheme,
  ThemeProvider,
  CssBaseline,
  useMediaQuery
} from '@material-ui/core';

import { Main as MainLayout } from './layouts';
import { Controls, Output, Help } from './components';

const App = () => {
  const isDark = useSelector(state => state.presentation.isDark);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = createMuiTheme({
    palette: {
      type: prefersDarkMode || isDark ? 'dark' : 'light',
      primary: {
        main: prefersDarkMode || isDark ? '#212121' : '#3f51b5'
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainLayout
        sidebarContent = {<Controls />}
        mainContent = {<Output />}
        helpContent = {<Help />}
      />
    </ThemeProvider>
  );
};

export default App;
