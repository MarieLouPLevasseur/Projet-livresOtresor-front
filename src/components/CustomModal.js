// CustomModal.js
import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const CustomModal = ({ open, onClose, title, description }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
    <Box
        sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white', 
        color: '#4462A5', // Écriture bleue
        width: 400, 
        p: 4, 
        borderRadius: 4, 
        textAlign : 'center'
        }}
    >        <h2 id="modal-title">{title}</h2>
        <p id="modal-description" >{description}</p>
      </Box>
    </Modal>
  );
};

export default CustomModal;
