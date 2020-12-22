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
      type: "scattergl",
      mode: "lines",
      line: {
        width: 3,
        color: '#ff8f7b',
      },
      x: output.t_vec,
      y: output.B1_x_vec
    },
    {
      name: "B1_y",
      type: "scattergl",
      mode: "lines",
      line: {
        width: 3,
        color: '#fbb84d',
      },
      x: output.t_vec,
      y: output.B1_y_vec
    },
    {
      name: "Gz",
      type: "scattergl",
      yaxis: 'y2',
      mode: "lines",
      line: {
        width: 3,
        color: '#02ffb3',
      },
      x: output.t_vec,
      y: output.Gz_vec
    },
  ];

  const layout = {
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
      gridcolor: gridColor,
      zerolinecolor: zeroColor,
      linecolor: gridColor,
      showspikes: false,
      showline: true
    },
    yaxis2: {
      title: 'Gradient (mT/m)',
      overlaying: 'y',
      side: 'right',
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
    responsive: true
  }

  return (
    <Plot data={data} layout={layout} config={config} className={classes.plot} />
  );
};

export default Pulse;