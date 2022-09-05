import React from 'react';
import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';
import {FormHelperText} from '@mui/material';

import InputLabel from '../InputLabel';
import Input from '../Input';

// common MuiFormControl styles should go here
const StyledField = styled('div')(() => ({
  margin: '0 0 10px 0'
}));

const Field = ({label, name, type, formik, ...props}) => {
  const hasError = formik.errors && formik.errors[name];
  return (
    <StyledField>
      <InputLabel>{label}</InputLabel>
      <Input
        id={`id-${name}`}
        variant="outlined"
        type={type}
        name={name}
        {...formik.getFieldProps(name)}
        {...props}
        error={hasError}
      />
      {hasError && <FormHelperText error={hasError}>{formik.errors[name]}</FormHelperText>}
    </StyledField>
  );
};

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
