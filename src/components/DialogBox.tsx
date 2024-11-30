import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

interface DeleteConfirmationDialogProps {
  open: boolean;
  handleDeleteCancel: () => void;
  handleDeleteConfirm: () => void;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({ open, handleDeleteCancel, handleDeleteConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={handleDeleteCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ minWidth: '400px' }} 
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{
          fontSize: '1rem', 
          fontWeight: 'bold', 
        }}
      >
        {"Are you sure you want to delete selected task?"}
      </DialogTitle>
      <DialogContent>
        <Typography
          sx={{
            fontSize: '0.875rem',
          }}
        >
          This will permanently delete the selected task. These items will no longer be accessible to you. This action is irreversible.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleDeleteCancel}
          color="primary"
          sx={{
            fontSize: '0.75rem', 
            fontFamily: 'Arial, sans-serif', 
            color: 'black',
            backgroundColor: 'white',
            border: '1px solid gray',
            textTransform: 'none', 
            '&:hover': {
              backgroundColor: '#f5f5f5', 
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleDeleteConfirm}
          color="secondary"
          sx={{
            fontSize: '0.75rem', 
            fontFamily: 'Arial, sans-serif', 
            backgroundColor: '#cb2e27',
            color: 'white',
            textTransform: 'none', 
            '&:hover': {
              backgroundColor: '#cb2e27', 
            },
          }}
        >
          Yes, delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
