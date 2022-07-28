import React from 'react';
import PropTypes from 'prop-types';

import Typography from 'components/Typography/components/Typography';
import {DialogConfirm} from 'components/Dialog';

// eslint-disable-next-line no-use-before-define
DeleteTagDialog.proTypes = {
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  open: PropTypes.bool,
  tag: PropTypes.shape({name: PropTypes.string})
};

// eslint-disable-next-line no-use-before-define
DeleteTagDialog.defaultProps = {
  open: false,
  tag: null
};

function DeleteTagDialog(props) {
  const {onCancel, onConfirm, open, tag} = props;

  return (
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
}

export default React.memo(DeleteTagDialog);
