import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Pulse, Magnetisation, Sphere, Profile } from './components'

const useStyles = makeStyles(theme => ({
  card: {
    padding: theme.spacing(2)
  },
  timeline: {
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
    paddingBottom: theme.spacing(2)
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
          <Sphere />
        </Paper>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Paper className={classes.card} variant="outlined">
          <Magnetisation />
        </Paper>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Paper className={classes.card} variant="outlined">
          <Profile />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Simulation;
