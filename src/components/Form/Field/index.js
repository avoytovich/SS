import React from 'react';
import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';

import InputLabel from '../InputLabel';
import Input from '../Input';

// common MuiFormControl styles should go here
const StyledField = styled('div')(() => ({
  margin: '0 0 10px 0'
}));

const Field = ({label, name, type, formik, ...props}) => (
  <StyledField>
    <InputLabel>{label}</InputLabel>
    <Input
      id={`id-${name}`}
      variant="outlined"
      type={type}
      name={name}
      {...formik.getFieldProps(name)}
      {...props}
    />
    {formik.error && formik.error[name] && <div>{formik.error[name]}</div>}
  </StyledField>
);

Field.defaultProps = {
  type: 'text',
  fullWidth: true
};

Field.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default Field;
