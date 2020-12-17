import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { toggleTheme } from '../../../../actions/presentation';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Tooltip, IconButton, Typography, Hidden } from '@material-ui/core';
import { Menu, Help, Brightness4 } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  logo: {
    marginRight: 'auto'
  },
  button: {
    marginLeft: theme.spacing(1)
  }
}));

const Topbar = props => {
  const { handleSidebarOpen, handleModalOpen } = props;

  const classes = useStyles();

  const dispatch = useDispatch();

  const handleThemeChange = () => {
    dispatch(toggleTheme());
  }

  return (
    <AppBar className={classes.root}>
      <Toolbar>
        <Typography 
          variant="h6"
          className={classes.logo}
          noWrap
        >
          Bloch Equation Simulator
        </Typography>
        <Tooltip title="Toggle light/dark theme">
          <IconButton
            edge="end"
            color="inherit"
            className={classes.button}
            aria-label="Toggle light/dark theme"
            onClick={handleThemeChange}
          >
            <Brightness4 />
          </IconButton>
        </Tooltip>
        <Tooltip title="User Manual">
          <IconButton
            edge="end"
            color="inherit"
            className={classes.button}
            aria-label="User Manual"
            onClick={handleModalOpen}
          >
            <Help />
          </IconButton>
        </Tooltip>
        
        <Hidden mdUp>
          <IconButton
            edge="end"
            color="inherit"
            className={classes.button}
            aria-label="Open settings"
            onClick={handleSidebarOpen}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  handleSidebarOpen: PropTypes.func,
  handleModalOpen: PropTypes.func
};

export default Topbar;