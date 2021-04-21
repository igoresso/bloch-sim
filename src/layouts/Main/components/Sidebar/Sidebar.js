import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Drawer } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 280,
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
}));

const Sidebar = props => {
  const { isOpen, handleSidebarClose, variant, children } = props;

  const classes = useStyles();

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={handleSidebarClose}
      open={isOpen}
      variant={variant}
    >
      {children}
    </Drawer>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleSidebarClose: PropTypes.func,
  variant: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default Sidebar;