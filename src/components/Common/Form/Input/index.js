import React from 'react';
import {Field, useFormikContext} from 'formik';
import {TextField} from 'formik-mui';
import PropTypes from 'prop-types';
import {InputLabel} from '@mui/material';

import useStyles from './styles';

const Input = ({
  name,
  label,
  min,
  max,
  type,
  variant,
  readOnly,
  handleChange,
  fullWidth,
  ...params
}) => {
  const classes = useStyles();

  const formikProps = useFormikContext();

  const handleChangeField = e => {
    formikProps.setFieldError(name, null);
    if (handleChange) handleChange(e, formikProps);
    formikProps.setFieldValue(name, e.target.value);
  };

  return (
    <>
      <InputLabel className={classes.label}>{label}</InputLabel>
      <Field
        fullWidth={fullWidth}
        name={name}
        type={type}
        variant={variant}
        component={TextField}
        className={classes.inputWrapper}
        InputProps={{
          inputProps: {
            min,
            max,
            readOnly,
            'data-testid': name,
            onChange: handleChangeField,
            className: classes.input
          }
        }}
        {...params}
      />
    </>
  );
};

Input.defaultProps = {
  type: 'text',
  variant: 'outlined',
  fullWidth: true
};

Input.propTypes = {
  type: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  readOnly: PropTypes.bool,
  variant: PropTypes.string,
  helperText: PropTypes.string,
  handleChange: PropTypes.func,
  fullWidth: PropTypes.bool,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default Input;
