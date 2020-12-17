import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const Footer = props => {
  const { className } = props;
  return (
    <Typography
      align="center"
      className={className}
    >
      Footer
    </Typography>
  );
};

Footer.propTypes = {
  className: PropTypes.string
}

export default Footer;