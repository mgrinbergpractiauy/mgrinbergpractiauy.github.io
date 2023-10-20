import React, { useState } from 'react';
import { Button, Modal, Backdrop, Fade, Paper, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import GeoLocalization from './GeoLocalization';

const Map = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Abrir Mapa
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        sx={{          
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Fade in={open}>
          <Paper sx={{ maxWidth: '90%', padding: '16px' }}>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                top: '8px',
                right: '8px',
              }}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h5" sx={{ marginBottom: '16px' }}>Mapa</Typography>
            <GeoLocalization />
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
};

export default Map;
