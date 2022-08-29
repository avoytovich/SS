import React from 'react';
import PropTypes from 'prop-types';

import Typography from 'components/Typography/components/Typography';
import {DialogConfirm} from 'components/Dialog';

const ApproveSkillModal = ({onCancel, onConfirm, open, skill}) => (
  <DialogConfirm
    confirmButtonContent="Approve"
    onCancel={onCancel}
    onConfirm={onConfirm}
    open={open}
    severity="error"
    title="Are you sure?"
  >
    <Typography>
      {skill?.name ? `Would you like to approve "${skill.name}" skill request?` : null}
    </Typography>
  </DialogConfirm>
);

ApproveSkillModal.proTypes = {
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  open: PropTypes.bool,
  skill: PropTypes.shape({name: PropTypes.string})
};

ApproveSkillModal.defaultProps = {
  open: false,
  skill: {}
};

export default React.memo(ApproveSkillModal);
