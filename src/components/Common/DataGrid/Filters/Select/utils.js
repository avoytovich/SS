import React from 'react';
import {Box, Checkbox, ListItemText, Typography} from '@mui/material';
import {grey} from '@mui/material/colors';

export const isValueEmpty = (multiple, value) => (multiple && value.length === 0) || value === '';

export const getSelectedLabel = (options, selectedValue) => {
  const selectedOption = options.find(option => option.id === selectedValue);
  return selectedOption ? selectedOption.label : '';
};

const getFirstSelectedLabel = (options, selectedValues) =>
  getSelectedLabel(options, selectedValues[0]);

export const SelectLabel = ({label}) => (
  <Box sx={{color: grey[500], paddingLeft: '4px'}}>{label}</Box>
);

export const Option = ({option, value, multiple}) => {
  if (multiple) {
    return (
      <>
        <Checkbox
          color="info"
          size="small"
          sx={{padding: '0 6px 0 0'}}
          checked={value.indexOf(option.id) > -1}
        />
        <ListItemText primary={option.label} />
      </>
    );
  }

  return <span>{option.label}</span>;
};

export const MultipleSelectedValue = ({values, options}) => (
  <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
    <Typography variant="body1">{getFirstSelectedLabel(options, values)}</Typography>
    <Typography variant="body2" color="primary">
      {values.length > 1 && `+ ${values.length - 1}`}
    </Typography>
  </Box>
);

export const getRenderValue = (value, options, multiple, label) => {
  if (isValueEmpty(multiple, value)) {
    return <SelectLabel label={label} />;
  }

  if (multiple) {
    return <MultipleSelectedValue values={value} options={options} />;
  }

  return getSelectedLabel(options, value);
};
