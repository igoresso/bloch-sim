import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/styles';
import Plot from '../Plot';

const useStyles = makeStyles(theme => ({
  plot: {
    width: '100%'
  }
}));

const Pulse = () => {
  const output = useSelector(state => state.simulation.output);
  const T_pulse = useSelector(state => state.simulation.params.T_pulse);

  const classes = useStyles();

  const theme = useTheme();
  const gridColor = theme.palette.type === "dark" ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)';
  const zeroColor = theme.palette.type === "dark" ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.4)';
  const textColor = theme.palette.type === "dark" ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 0.8)';


  const data = [
    {
      name: "M_xy",
      type: "scattergl",
      mode: "lines",
      visible: "legendonly",
      line: {
        width: 3,
        color: '#ff7eb8',
      },
      x: output.t_vec,
      y: output.Mxy_vec
    },
    {
      name: "M_x",
      type: "scattergl",
      mode: "lines",
      line: {
        width: 3,
        color: '#ff8f7b',
      },
      x: output.t_vec,
      y: output.Mx_vec
    },
    {
      name: "M_y",
      type: "scattergl",
      mode: "lines",
      line: {
        width: 3,
        color: '#fbb84d',
      },
      x: output.t_vec,
      y: output.My_vec
    },
    {
      name: "M_z",
      type: "scatter",
      mode: "lines",
      line: {
        width: 3,
        color: '#b7e15d',
      },
      x: output.t_vec,
      y: output.Mz_vec
    },
  ];

  const layout = {
    height: 450,
    paper_bgcolor: "transparent",
    plot_bgcolor: "transparent",
    title: {
      text: "Magnetisation"
    },
    xaxis: {
      title: {
        text: 'Time (ms)'
      },
      type: 'linear',
      range: [0, T_pulse],
      gridcolor: gridColor,
      zerolinecolor: zeroColor,
      linecolor: gridColor,
      showspikes: false
    },
    yaxis: {
      title: {
        text: 'Normalised Magnetisation',
        standoff: 5
      },
      type: 'linear',
      gridcolor: gridColor,
      zerolinecolor: zeroColor,
      linecolor: gridColor,
      showspikes: false
    },
    font: {
      color: textColor
    },
    modebar: {
      bgcolor: 'transparent',
      color: gridColor,
      activecolor: zeroColor
    }
  }

  const config = {
    responsive: true,
    displaylogo: false
  }

  return (
    <Plot data={data} layout={layout} config={config} className={classes.plot} useResizeHandler={true} />
  );
};

export default Pulse;