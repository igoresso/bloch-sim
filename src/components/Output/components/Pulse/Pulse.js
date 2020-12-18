import React from 'react';
import { useSelector } from 'react-redux';
import Plot from 'react-plotly.js';
import { makeStyles, useTheme } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  plot: {
    width: '100%'
  }
}));

const Pulse = () => {
  const output = useSelector(state => state.simulation.output);

  const classes = useStyles();

  const theme = useTheme();
  const gridColor = theme.palette.type === "dark" ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)';
  const zeroColor = theme.palette.type === "dark" ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.4)';
  const textColor = theme.palette.type === "dark" ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 0.8)';

  const data = [
    {
      name: "B1_x",
      type: "scatter",
      mode: "lines",
      line: {
        width: 3,
        color: '#a05195',
      },
      x: output.t_vec,
      y: output.B1_x_vec
    },
    {
      name: "B1_y",
      type: "scatter",
      mode: "lines",
      line: {
        width: 3,
        color: '#f95d6a',
      },
      x: output.t_vec,
      y: output.B1_y_vec
    },
  ];

  const layout = {
    //margin: { b: 30, t: 30 },
    height: 450,
    paper_bgcolor: "transparent",
    plot_bgcolor: "transparent",
    title: {
      text: "Excitation Pattern"
    },
    xaxis: {
      title: {
        text: 'Time (ms)'
      },
      type: 'linear',
      range: [0, output.T_pulse],
      spikethickness: 1,
      gridcolor: gridColor,
      zerolinecolor: zeroColor,
      linecolor: gridColor,
      showspikes: false
    },
    yaxis: {
      title: {
        text: 'Amplitude (mT)',
        standoff: 5
      },
      type: 'linear',
      spikethickness: 1,
      gridcolor: gridColor,
      zerolinecolor: zeroColor,
      linecolor: gridColor,
      showspikes: false,
      showline: true
    },
    font: {
      color: textColor
    }
  }

  const config = {
    responsive: true
  }

  return (
    <Plot data={data} layout={layout} config={config} className={classes.plot} />
  );
};

export default Pulse;