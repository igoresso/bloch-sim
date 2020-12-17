import React from 'react';
import PropTypes from 'prop-types';
import { Paper, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(4)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.primary,
  }
}));

const Dialog = props => {
  const { children, handleDialogClose } = props;

  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <IconButton aria-label="closeButton" className={classes.closeButton} onClick={handleDialogClose}>
        <Close />
      </IconButton>
      {children}
    </Paper>
  );
};

Dialog.propTypes = {
  children: PropTypes.node,
  handleDialogClose: PropTypes.func
};

export default Dialog;