import React from 'react'
import { 
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from 'react-router-dom';
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
        <Router>
          <Switch>
            <Redirect
              from="\/[\s\S]+"
              to="/"
            />
            <Route
              exact
              path="/"
            >
            <MainLayout
              sidebarContent = {<Controls />}
              mainContent = {<Output />}
              helpContent = {<Help />}
            />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
