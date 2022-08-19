import React from 'react';
import PropTypes from 'prop-types';

import Typography from 'components/Typography/components/Typography';
import {DialogConfirm} from 'components/Dialog';

const DeleteTagModal = ({onCancel, onConfirm, open, tag}) => (
  <DialogConfirm
    confirmButtonContent="Delete"
    onCancel={onCancel}
    onConfirm={onConfirm}
    open={open}
    severity="error"
    title="Are you sure?"
  >
    <Typography>{tag?.name ? `Would you like to remove "${tag.name}" tag?` : null}</Typography>
  </DialogConfirm>
);

DeleteTagModal.proTypes = {
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  open: PropTypes.bool,
  tag: PropTypes.shape({name: PropTypes.string})
};

DeleteTagModal.defaultProps = {
  open: false,
  tag: null
};

export default React.memo(DeleteTagModal);
