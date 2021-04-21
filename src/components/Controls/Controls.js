import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { update, simulate, clear } from '../../actions/simulation';
import { Grid, TextField, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2)
  }
}));

const Controls = () => {
  const params = useSelector(state => state.simulation.params);
  const [formState, setFormState] = useState(params);
  const [isActive, setActive] = useState(false);
  const [isWorking, setWorking] = useState(false);
  
  const dispatch = useDispatch();

  const classes = useStyles();

  const handleFieldChange = (e) => {
    if (Number(e.target.value) !== formState[e.target.name]) {
      setFormState({
        ...params,
        ...{[e.target.name]: Number(e.target.value)}
      })
      setActive(true);
    }
  };

  const updateParameter = (e) => {
    if (Number(e.target.value) !== params[e.target.name]) {
      dispatch(update({
        [e.target.name]: Number(e.target.value)
      })).then(dispatch(clear()));
      setActive(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setWorking(true)
    dispatch(simulate()).then(setWorking(false))
  }

  return (
    <form autoComplete="off">
      <Typography variant="h6" component="h2" align="center">
        General
      </Typography>
      <Grid container spacing={1} className={classes.root}>
        <Grid item xs={6}>
          <TextField
            label="B&#x2080; (T)"
            id="B0"
            name="B0"
            type="number"
            inputProps={{ step:'any', min: 0 }}
            value={isActive ? formState.B0 : params.B0}
            onChange={handleFieldChange}
            onBlur={updateParameter}
            margin="dense"
            variant="outlined"
            disabled = {isWorking}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="&#947; (MHz/T)"
            id="gamma"
            name="gamma"
            type="number"
            inputProps={{ step:'any', min: 0 }}
            value={isActive ? formState.gamma : params.gamma}
            onChange={handleFieldChange}
            onBlur={updateParameter}
            margin="dense"
            variant="outlined"
            disabled = {isWorking}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="T&#8321; (ms)"
            id="T1"
            name="T1"
            type="number"
            inputProps={{ step:'any', min: 0 }}
            value={isActive ? formState.T1 : params.T1}
            onChange={handleFieldChange}
            onBlur={updateParameter}
            margin="dense"
            variant="outlined"
            disabled = {isWorking}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="T&#x2082; (ms)"
            id="T2"
            name="T2"
            type="number"
            inputProps={{ step:'any', min: 0 }}
            value={isActive ? formState.T2 : params.T2}
            onChange={handleFieldChange}
            onBlur={updateParameter}
            margin="dense"
            variant="outlined"
            disabled = {isWorking}
          />
        </Grid>
      </Grid>
      <Typography variant="h6" component="h2" align="center">
        Pulse
      </Typography>
      <Grid container spacing={1} m={2} className={classes.root}>
        <Grid item xs={6}>
          <TextField
            label="T (ms)"
            id="T_pulse"
            name="T_pulse"
            type="number"
            inputProps={{ step:'any', min: 0 }}
            value={isActive ? formState.T_pulse : params.T_pulse}
            onChange={handleFieldChange}
            onBlur={updateParameter}
            margin="dense"
            variant="outlined"
            disabled = {isWorking}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="N"
            id="N_pulse"
            name="N_pulse"
            type="number"
            inputProps={{ step:'any', min: 0 }}
            value={isActive ? formState.N_pulse : params.N_pulse}
            onChange={handleFieldChange}
            onBlur={updateParameter}
            margin="dense"
            variant="outlined"
            disabled = {isWorking}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="dt (ms)"
            id="dt_pulse"
            name="dt_pulse"
            type="number"
            inputProps={{ step:'any', min: 0 }}
            value={isActive ? formState.dt_pulse : params.dt_pulse}
            onChange={handleFieldChange}
            onBlur={updateParameter}
            margin="dense"
            variant="outlined"
            disabled = {isWorking}
          />
        </Grid>
        <Grid item xs={6}>
        <TextField
            label={<>B<sub>1, max</sub> (mT)</>}
            id="amp_pulse"
            name="amp_pulse"
            type="number"
            inputProps={{ step:'any' }}
            value={isActive ? formState.amp_pulse : params.amp_pulse}
            onChange={handleFieldChange}
            onBlur={updateParameter}
            margin="dense"
            variant="outlined"
            disabled = {isWorking}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Shape"
            id="shape"
            name="shape"
            select
            SelectProps={{
              native: true,
            }}
            value={params.shape}
            onChange={updateParameter}
            margin="dense"
            variant="outlined"
            disabled = {isWorking}
          >
            {params.shape_options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
            </option>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Lobes"
            id="lobes"
            name="lobes"
            type="number"
            inputProps={{ step:'any', min: 0 }}
            value={isActive ? formState.lobes : params.lobes}
            onChange={handleFieldChange}
            onBlur={updateParameter}
            margin="dense"
            variant="outlined"
            disabled = {params.shape!==2 || isWorking}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="&#963; (ms)"
            id="sd"
            name="sd"
            type="number"
            inputProps={{ step:'any' }}
            value={isActive ? formState.sd : params.sd}
            onChange={handleFieldChange}
            onBlur={updateParameter}
            margin="dense"
            variant="outlined"
            disabled = {params.shape!==4 || isWorking}
          />
        </Grid>
      </Grid>
      <Typography variant="h6" component="h2" align="center">
        Gradient
      </Typography>
      <Grid container spacing={1} m={2} className={classes.root}>
        <Grid item xs={6}>
          <TextField
            label={<>G<sub>z</sub> (mT/m)</>}
            id="amp_Gz"
            name="amp_Gz"
            type="number"
            inputProps={{ step:'any', min: 0 }}
            value={isActive ? formState.amp_Gz : params.amp_Gz }
            onChange={handleFieldChange}
            onBlur={updateParameter}
            margin="dense"
            variant="outlined"
            disabled = {isWorking}
          />
        </Grid>
      </Grid>
      <Typography variant="h6" component="h2" align="center">
        Slice Profile
      </Typography>
      <Grid container spacing={1} m={2} className={classes.root}>
        <Grid item xs={6}>
          <TextField
            label="l (mm)"
            id="l_profile"
            name="l_profile"
            type="number"
            inputProps={{ step:'any', min: 0 }}
            value={isActive ? formState.l_profile : params.l_profile }
            onChange={handleFieldChange}
            onBlur={updateParameter}
            margin="dense"
            variant="outlined"
            disabled = {isWorking}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="N"
            id="N_profile"
            name="N_profile"
            type="number"
            inputProps={{ step:'any', min: 0 }}
            value={isActive ? formState.N_profile : params.N_profile }
            onChange={handleFieldChange}
            onBlur={updateParameter}
            margin="dense"
            variant="outlined"
            disabled = {isWorking}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="dl (mm)"
            id="dl_profile"
            name="dl_profile"
            type="number"
            inputProps={{ step:'any', min: 0 }}
            value={isActive ? formState.dl_profile : params.dl_profile }
            onChange={handleFieldChange}
            onBlur={updateParameter}
            margin="dense"
            variant="outlined"
            disabled = {isWorking}
          />
        </Grid>
      </Grid>
      <Button
        color="primary"
        variant="contained"
        size="large"
        type="submit"
        onClick={handleSubmit}
        disabled={isWorking}
        fullWidth
        disableElevation
      >
        {isWorking ?  'Working' : 'Simulate'}
      </Button>
    </form>
  );
};

export default Controls;