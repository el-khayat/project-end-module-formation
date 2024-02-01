import React from 'react';
import { styled, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';

const StyledButton = styled(Button)({
  color: (props) => (props.color === 'error' ? 'red' : 'green'),
});

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, itemName, text, btn1 }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <Typography>
          {`${text} `}
          <span style={{ color: btn1 === 'Delete' ? 'red' : 'green' }}>{itemName}</span>
          {'?'}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          Cancel
        </Button>
        <StyledButton onClick={onConfirm} color={btn1 === 'Delete' ? 'error' : 'success'}
          variant="contained" sx={{ my: 1, width: '100px' }}>
          {btn1}
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteModal;