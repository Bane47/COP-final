import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const RowDetailsModal = ({ selectedRow, onClose }) => {
  return (
    <Dialog open={!!selectedRow} onClose={onClose}>
      <DialogTitle>Row Details</DialogTitle>
      <DialogContent>
        {/* Render the row details here */}
        <div>
          <strong>Crime Type:</strong> {selectedRow?.type}
        </div>
        <div>
          <strong>Description:</strong> {selectedRow?.description}
        </div>
        {/* Add more details here as needed */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RowDetailsModal;
