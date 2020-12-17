import React from 'react';
import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { useTheme } from '@material-ui/styles';

const Pulse = () => {
  const output = useSelector(state => state.simulation.output);

  const theme = useTheme();
  const gridColor = theme.palette.type === "dark" ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)';
  const zeroColor = theme.palette.type === "dark" ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.4)';
  const textColor = theme.palette.type === "dark" ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 0.8)';

  const data = {
    datasets: [
      {
        label: 'B1_x',
        data: output.t_vec.map((v,i) => ({ x: output.t_vec[i], y: output.B1_x_vec[i] })),
        fill: false,
        pointRadius: 0,
        lineTension: 0,
        borderColor: '#a05195'
      },
      {
        label: 'B1_y',
        data: output.t_vec.map((v,i) => ({ x: output.t_vec[i], y: output.B1_y_vec[i] })),
        fill: false,
        pointRadius: 0,
        lineTension: 0,
        borderColor: '#f95d6a'
      },
    ],
  }

  const options = {
    scales: {
        xAxes: [{
          type: 'linear',
          position: 'bottom',
          gridLines: {
            color: gridColor,
            zeroLineColor: zeroColor
          },
          scaleLabel: {
            display: true,
            labelString: 'Time (ms)',
            fontSize: 16,
            fontColor: textColor
          },
          ticks: {
            min: output.t_vec[0],
            max: [...output.t_vec].pop(),
            stepSize: [...output.t_vec].pop() / 10,
            fontColor: textColor
          }
        }],
        yAxes: [{
          gridLines: {
            color: gridColor,
            zeroLineColor: zeroColor
          },
          scaleLabel: {
            display: true,
            labelString: 'Amplitude (mT)',
            fontSize: 16,
            fontColor: textColor
          },
          ticks: {
            fontColor: textColor
          }
        }],
    },
    legend: {
      display: true,
      position: 'right',
      labels: {
        fontSize: 14,
        fontColor: textColor
      }
    },
    tooltips: {
      enabled: false
    },
    animation: {
      duration: 0
    },
    hover: {
      animationDuration: 0,
    },
    responsiveAnimationDuration: 0
  }

  return (
    <Line data={data} options={options}/>
  );
};

export default Pulse;