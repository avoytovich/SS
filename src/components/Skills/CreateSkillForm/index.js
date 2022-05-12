import React from 'react';
import PropTypes from 'prop-types';

// import Button from '@mui/material/Button';

const CreateSkillForm = ({onClose, onSubmit}) => {
  const handleSubmit = () => {
    onSubmit();
  };
  return (
    <div onClick={onClose} onSubmit={handleSubmit}>
      Form
    </div>
  );
};

CreateSkillForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

CreateSkillForm.defaultProps = {
  onSubmit: () => {},
  onClose: () => {}
};

export default CreateSkillForm;
