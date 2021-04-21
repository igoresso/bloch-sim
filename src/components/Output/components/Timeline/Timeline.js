import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Slider, IconButton, Box } from '@material-ui/core';
import { PlayArrow, Stop, SkipPrevious, SkipNext } from '@material-ui/icons';
import { update } from '../../../../actions/simulation';

const Timeline = props => {
  const { className } = props;

  const { t_vec } = useSelector(state => state.simulation.output);
  const { isPlaying, current_index } = useSelector(state => state.simulation.params);

  const [sliderIndex, setSliderIndex] = useState(current_index);
  const [isActive, setActive] = useState(false);

  const dispatch = useDispatch();

  const marks = [
    {
      value: 0,
      label: `${t_vec[0]} (ms)`,
    },
    {
      value: t_vec.length-1,
      label: `${t_vec[t_vec.length-1]} (ms)`
    }
  ]
  const getTime = index => t_vec[index].toFixed(2);

  const handleChange = (e, v) => {
    if (v !== current_index) {
      setActive(true)
      setSliderIndex(v)
    }
  }

  const handleUpdate = (e, v) => {
    if (v !== current_index) {
      dispatch(update({
        current_index: v
      }));
      setActive(false);
    }
  }

  return (
    <Box className={className}>
      <Slider
        aria-label="Timeline"
        marks={marks}
        defaultValue={t_vec.length-1}
        min={0}
        max={t_vec.length-1}
        step={1}
        name="current_index"
        value={isActive ? sliderIndex : current_index}
        valueLabelDisplay="auto"
        valueLabelFormat={getTime}
        color="secondary"
        onChange={handleChange}
        onChangeCommitted={handleUpdate}
        disabled
      />
      <Box display="flex" justifyContent="center">
        <IconButton
          aria-label="Previous time point"
        >
          <SkipPrevious />
        </IconButton>
        <IconButton
          aria-label="Play/Stop"
        >
          {isPlaying ? <Stop />: <PlayArrow />}
          
        </IconButton>
        <IconButton
          aria-label="Next time point"
        >
          <SkipNext />
        </IconButton>
      </Box>
    </Box>
  );
};

Timeline.propTypes = {
  className: PropTypes.string
}

export default Timeline;
