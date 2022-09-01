import React from 'react';
import PropTypes from 'prop-types';
import {FormHelperText} from '@mui/material';
import MuiTextField from '@mui/material/TextField';
import MuiAutocomplete from '@mui/material/Autocomplete';

import InputLabel from '../InputLabel';

import useStyles from './styles';

const SelectField = ({
  name,
  label,
  min,
  max,
  type,
  variant,
  readOnly,
  returnIdToField,
  handleChange,
  multiple,
  fullWidth,
  options,
  formik,
  defaultValue,
  placeholder,
  ...params
}) => {
  const classes = useStyles();

  const {touched, errors} = formik;

  console.log(defaultValue);

  const hasError = touched[name] && errors[name];

  const handleChangeField = (event, values) => {
    formik.setFieldError(name, null);
    formik.setFieldValue(name, values);

    if (returnIdToField) {
      const newValues = [];
      values.map(value => newValues.push(value.id));
      formik.setFieldValue(returnIdToField, newValues);
    }
  };

  return (
    <div className={classes.selectWrapper}>
      <InputLabel>{label}</InputLabel>
      <MuiAutocomplete
        multiple={multiple}
        id={`id-${name}`}
        options={options}
        getOptionLabel={option => option.name}
        value={defaultValue}
        filterSelectedOptions
        fullWidth={fullWidth}
        onChange={handleChangeField}
        disableCloseOnSelect={multiple}
        {...params}
        renderInput={param => (
          <MuiTextField {...param} error={hasError} name="autocomplete" placeholder={placeholder} />
        )}
      />
      {hasError && <FormHelperText error={hasError}>{errors}</FormHelperText>}
    </div>
  );
};

SelectField.defaultProps = {
  type: 'text',
  variant: 'outlined',
  fullWidth: true,
  multiple: false,
  options: [],
  returnIdToField: ''
};

SelectField.propTypes = {
  type: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  readOnly: PropTypes.bool,
  variant: PropTypes.string,
  helperText: PropTypes.string,
  handleChange: PropTypes.func,
  fullWidth: PropTypes.bool,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array,
  returnIdToField: PropTypes.string,
  multiple: PropTypes.bool
};

export default SelectField;
