import React, {useState} from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import {useUpdateTagMutation, useAddTagMutation} from 'api/tags';

export default function TagModal({open, id, name, onClose, ...rest}) {
  const [updateTag] = useUpdateTagMutation();
  const [addTag] = useAddTagMutation();
  const [modalValue, setModalValue] = useState(name || '');
  const title = id ? `Edit "${name}" tag` : 'Create new tag';

  const onSave = () => {
    const body = {name: modalValue};
    if (id) {
      updateTag({id, body});
    } else {
      addTag({body});
    }
    onClose();
  };

  const handleValueChange = e => setModalValue(e.target.value);

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} {...rest}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{marginBottom: '16px'}}>Input name of the Tag</DialogContentText>
        <TextField
          data-testid="tag-dialog-input"
          autoFocus
          size="small"
          margin="dense"
          id="name"
          label="Tag name"
          value={modalValue}
          onChange={handleValueChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions sx={{margin: '0 12px 10px 0'}}>
        <Button
          variant="outlined"
          sx={{borderRadius: '40px'}}
          data-testid="tag-dialog-cancel-btn"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{borderRadius: '40px'}}
          disabled={!modalValue}
          data-testid="tag-dialog-save-btn"
          onClick={onSave}
        >
          {id ? 'Edit tag' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

TagModal.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
