import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, IconButton, Typography, Hidden } from '@material-ui/core';
import Settings from '@material-ui/icons/Settings';

const useStyles = makeStyles(theme => ({
  settingsButton: {
    marginLeft: 'auto',
  }
}));

const Topbar = props => {
  const { handleSidebarOpen } = props;

  const classes = useStyles();

  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" noWrap>
          MRI Simulator
        </Typography>
        <Hidden mdUp>
          <IconButton
            edge="end"
            className={classes.settingsButton}
            color="inherit"
            aria-label="Open settings"
            onClick={handleSidebarOpen}
          >
            <Settings />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  handleSidebarOpen: PropTypes.func
};

export default Topbar;