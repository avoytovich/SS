import React from 'react';
import PropTypes from 'prop-types';

import Typography from 'components/Typography/components/Typography';
import {DialogConfirm} from 'components/Dialog';

const DeleteGroupModal = ({onCancel, onConfirm, open, group}) => (
  <DialogConfirm
    confirmButtonContent="Delete"
    onCancel={onCancel}
    onConfirm={onConfirm}
    open={open}
    severity="error"
    title="Are you sure?"
  >
    <Typography>
      {group?.name ? `Would you like to remove "${group.name}" group?` : null}
    </Typography>
  </DialogConfirm>
);

DeleteGroupModal.proTypes = {
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  open: PropTypes.bool,
  group: PropTypes.shape({name: PropTypes.string})
};

DeleteGroupModal.defaultProps = {
  open: false,
  group: null
};

export default React.memo(DeleteGroupModal);
