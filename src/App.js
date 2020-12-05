import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from './theme';
import { Main as MainLayout } from './layouts';
import { Charts } from './views';

const App = () => {
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
            <MainLayout>
              <Charts />
            </MainLayout>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
