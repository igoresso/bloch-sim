import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Pulse, Magnetisation } from './components'

const useStyles = makeStyles(theme => ({
  card: {
    padding: theme.spacing(2)
  }
}));

const Simulation = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} lg={6}>
        <Paper className={classes.card} variant="outlined">
          <Pulse />
        </Paper>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Paper className={classes.card} variant="outlined">
          <Magnetisation />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Simulation;