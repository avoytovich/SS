import React from 'react';
import {Field, useFormikContext, ErrorMessage} from 'formik';
import {Autocomplete} from 'formik-mui';
import PropTypes from 'prop-types';

import {InputLabel, FormHelperText} from '@mui/material';
import MuiTextField from '@mui/material/TextField';

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
  ...params
}) => {
  const classes = useStyles();

  const formikProps = useFormikContext();

  const {touched, errors} = formikProps;

  const hasError = touched[name] && errors[name];

  console.log(errors);
  console.log(touched);
  console.log(hasError);

  const handleChangeField = (event, values) => {
    formikProps.setFieldError(name, null);
    formikProps.setFieldValue(name, values);

    if (returnIdToField) {
      const newValues = [];
      values.map(value => newValues.push(value.id));
      formikProps.setFieldValue(returnIdToField, newValues);
    }
  };

  return (
    <div className={classes.selectWrapper}>
      <InputLabel className={classes.label}>{label}</InputLabel>
      <Field
        name={name}
        multiple={multiple}
        component={Autocomplete}
        options={options}
        getOptionLabel={option => option.name}
        fullWidth={fullWidth}
        onChange={handleChangeField}
        renderInput={paramsInput => (
          <MuiTextField
            {...paramsInput}
            name="autocomplete"
            error={hasError}
            // helperText={touched['autocomplete'] && errors['autocomplete']}
            variant="outlined"
          />
        )}
        disableCloseOnSelect
        // renderOption={(props, option, {selected}) => (
        //   <li {...props} className={classes.optionItems}>
        //     <Checkbox
        //       icon={icon}
        //       checkedIcon={checkedIcon}
        //       style={{marginRight: 8}}
        //       checked={selected}
        //     />
        //     {option.name}
        //   </li>
        // )}
        {...params}
      />
      {hasError && (
        <FormHelperText error={hasError}>
          <ErrorMessage name={name} />
        </FormHelperText>
      )}
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
