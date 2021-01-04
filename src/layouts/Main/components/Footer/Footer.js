import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Link } from '@material-ui/core';

const Footer = props => {
  const { className } = props;
  
  const date = new Date();

  return (
    <footer className={className}>
      <Grid
      container
      justify="center"
      spacing={2}
      >
        <Grid item>
          <Link
            href="https://en.wikipedia.org/wiki/Bloch_equations"
            color="textPrimary"
            target="_blank"
          >
            Wiki
          </Link>
        </Grid>
        <Grid item>
          <Link
            href="https://github.com/igoresso/bloch-sim"
            color="textPrimary"
            target="_blank"
          >
            GitHub
          </Link>
        </Grid>
        <Grid item>
          <Link
            href="https://github.com/igoresso/bloch-sim/issues"
            color="textPrimary"
            target="_blank"
          >
            Found a mistake?
          </Link>
        </Grid>
      </Grid>
      <Typography
        align="center"
        color="textSecondary"
        variant="body2"
      >
        {`© 2020-${date.getFullYear()}`}
      </Typography>
    </footer>
  );
};

Footer.propTypes = {
  className: PropTypes.string
}

export default Footer;