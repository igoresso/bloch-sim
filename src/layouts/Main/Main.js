import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery, Fade, Modal, Backdrop } from '@material-ui/core';

import { Sidebar, Topbar, Footer, Dialog } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    paddingTop: 56,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  },
  contentShift: {
    paddingLeft: 280
  },
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    paddingBottom: 0
  },
  shiftContent: {
    paddingLeft: 280
  },
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    maxWidth: '1000px',
    margin: '10vh auto',
    [theme.breakpoints.up('xs')]: {
      padding: '0 2vh'
    },
    [theme.breakpoints.up('sm')]: {
      padding: '0 5vh'
    },
    [theme.breakpoints.up('md')]: {
      padding: '0 5vh'
    },
    [theme.breakpoints.up('lg')]: {
      padding: '0'
    },
  },
  footer : {
    marginTop: 'auto',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  }
}));

const Main = props => {
  const { sidebarContent, mainContent, helpContent } = props;

  const classes = useStyles();
  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true
  });

  const [openSidebar, setOpenSidebar] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };
  
  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  return (
    <div 
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop
      })}
    >
      <Topbar 
        handleSidebarOpen={handleSidebarOpen}
        handleModalOpen={handleModalOpen}
      />
      <Sidebar
        isOpen={shouldOpenSidebar}
        handleSidebarClose={handleSidebarClose}
        variant={isDesktop ? 'persistent' : 'temporary'}
      >
        {sidebarContent}
      </Sidebar>
      <main
        className={classes.content}
      >
        {mainContent}
        <Footer className={classes.footer} />
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          className={classes.modal}
          open={openModal}
          onClose={handleModalClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openModal}>
            <Dialog handleDialogClose={handleModalClose}>
              {helpContent}
            </Dialog>
          </Fade>
        </Modal>
      </main>
    </div>
  );
};

Main.propTypes = {
  sidebarContent: PropTypes.any.isRequired,
  mainContent: PropTypes.any.isRequired,
  helpContent: PropTypes.any.isRequired
}

export default Main;