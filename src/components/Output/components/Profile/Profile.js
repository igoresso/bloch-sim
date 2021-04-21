import React  from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/styles';
import Plot from '../Plot';

const useStyles = makeStyles(theme => ({
  plot: {
    width: '100%'
  }
}));

const Profile = () => {
  const {
    SPx_vec,
    SPy_vec,
    SPxy_vec,
    SPz_vec,
    z_vec
  } = useSelector(state => state.simulation.output);
  const { l_profile } = useSelector(state => state.simulation.params);

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
      line: {
        width: 3,
        color: '#ff7eb8',
      },
      x: z_vec,
      y: SPxy_vec,
    },
    {
      name: "M_x",
      type: "scattergl",
      mode: "lines",
      visible: "legendonly",
      line: {
        width: 3,
        color: '#ff8f7b',
      },
      x: z_vec,
      y: SPx_vec,
    },
    {
      name: "M_y",
      type: "scattergl",
      mode: "lines",
      visible: "legendonly",
      line: {
        width: 3,
        color: '#fbb84d',
      },
      x: z_vec,
      y: SPy_vec,
    },
    {
      name: "M_z",
      type: "scattergl",
      mode: "lines",
      visible: "legendonly",
      line: {
        width: 3,
        color: '#b7e15d',
      },
      x: z_vec,
      y: SPz_vec,
    }
  ];

  const layout = {
    height: 450,
    paper_bgcolor: "transparent",
    plot_bgcolor: "transparent",
    title: {
      text: "Slice Profile"
    },
    xaxis: {
      title: {
        text: 'z (mm)'
      },
      type: 'linear',
      range: [-l_profile/2, l_profile/2],
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
      showspikes: false,
      showline: true
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
    <Plot
      data={data}
      layout={layout}
      config={config}
      className={classes.plot}
      useResizeHandler={true} />
  );
};

export default Profile;