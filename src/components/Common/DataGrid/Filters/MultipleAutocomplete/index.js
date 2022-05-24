import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';

const MultipleAutocomplete = ({
  id,
  options,
  value,
  inputValue,
  loading,
  label,
  placeholder,
  minWidth,
  onAddOption,
  onInputChange,
  ...rest
}) => (
  <Autocomplete
    id={id}
    data-testid={`${id}-input`}
    multiple
    size="small"
    options={options}
    value={value}
    onChange={onAddOption}
    limitTags={3}
    getOptionLabel={option => option.name}
    sx={{minWidth}}
    renderInput={params => (
      <TextField
        {...params}
        label={label}
        value={inputValue}
        placeholder={placeholder}
        onChange={onInputChange}
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <>
              {loading ? <CircularProgress color="inherit" size={20} /> : null}
              {params.InputProps.endAdornment}
            </>
          )
        }}
      />
    )}
    {...rest}
  />
);

MultipleAutocomplete.propTypes = {
  id: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  value: PropTypes.arrayOf(PropTypes.object),
  inputValue: PropTypes.string,
  loading: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onAddOption: PropTypes.func,
  onInputChange: PropTypes.func
};

MultipleAutocomplete.defaultProps = {
  id: 'multiple-options-filter',
  options: [],
  placeholder: 'Search',
  loading: false,
  label: 'Label',
  minWidth: '233px'
};

export default MultipleAutocomplete;
