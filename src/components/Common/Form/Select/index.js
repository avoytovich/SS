import React from 'react';
import {Field, useFormikContext} from 'formik';
import {Autocomplete} from 'formik-mui';
import PropTypes from 'prop-types';

import {InputLabel} from '@mui/material';
import MuiTextField from '@mui/material/TextField';
// import Checkbox from '@mui/material/Checkbox';
// import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';

import useStyles from './styles';

// const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
// const checkedIcon = <CheckBoxIcon fontSize="small" />;

const SelectField = ({
  name,
  label,
  min,
  max,
  type,
  variant,
  readOnly,
  returnFullObj,
  handleChange,
  multiple,
  fullWidth,
  options,
  ...params
}) => {
  const classes = useStyles();

  const formikProps = useFormikContext();

  // const {touched, errors} = formikProps;

  const handleChangeField = (event, values) => {
    formikProps.setFieldError(name, null);
    const newValues = [];
    values.map(value => newValues.push(value.id));
    formikProps.setFieldValue(name, newValues);
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
            // error={touched['autocomplete'] && !!errors['autocomplete']}
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
    </div>
  );
};

SelectField.defaultProps = {
  type: 'text',
  variant: 'outlined',
  fullWidth: true,
  multiple: false,
  options: [],
  returnFullObj: false // if false, will return only value
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
  returnFullObj: PropTypes.bool,
  multiple: PropTypes.bool
};

export default SelectField;
