import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/styles';
import Plot from '../Plot';

import generateSphere from './generateSphere';

const useStyles = makeStyles(theme => ({
  plot: {
    width: '100%'
  }
}));

const Sphere = () => {
  const output = useSelector(state => state.simulation.output);

  const classes = useStyles();

  const theme = useTheme();
  const gridColor = theme.palette.type === "dark" ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  const zeroColor = theme.palette.type === "dark" ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.4)';
  const textColor = theme.palette.type === "dark" ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 0.8)';


  const sphereMesh = generateSphere();

  const data = [
    {
      type: "scatter3d",
      mode: "lines",
      opacity: 0.2,
      line: {
        width: 2,
        color: sphereMesh.z,
        colorscale: "Portland",
      },
      hoverinfo: "none",
      showlegend: false,
      ...sphereMesh,
    },
    {
      type: "scatter3d",
      mode: "lines",
      line: {
        width: 5,
        color: "#ff0000",
      },
      hoverinfo: "none",
      showlegend: false,
      x: output.Mx_vec,
      y: output.My_vec,
      z: output.Mz_vec,
    }
  ];

  const layout = {
    margin: { l: 0, r: 0, b: 0, t: 0 },
    height: 450,
    paper_bgcolor: "transparent",
    scene: {
      bgcolor: "transparent",
      xaxis: {
        title: "X",
        range: [-1, 1],
        type: 'linear',
        gridcolor: gridColor,
        zerolinecolor: zeroColor,
        linecolor: gridColor,
        showspikes: false,
        
      },
      yaxis: {
        title: "Y",
        range: [-1, 1],
        type: 'linear',
        gridcolor: gridColor,
        zerolinecolor: zeroColor,
        linecolor: gridColor,
        showspikes: false,
      },
      zaxis: {
        title: "Z",
        range: [-1, 1],
        type: 'linear',
        gridcolor: gridColor,
        zerolinecolor: gridColor,
        linecolor: gridColor,
        showspikes: false,
      },
      camera: {
        eye: {x: 1.3, y: 1.3, z: 1.3},
      },
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
    modeBarButtonsToRemove: ['hoverClosest3d'],
    displaylogo: false
  }

  return (
    <Plot data={data} layout={layout} config={config} className={classes.plot} useResizeHandler={true} />
  );
};

export default Sphere;