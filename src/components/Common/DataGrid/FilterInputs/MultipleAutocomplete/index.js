import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

const MultipleAutocomplete = ({
  setSearch,
  options,
  value,
  loading,
  label,
  placeholder,
  onAddOption,
  onInputChange,
  ...rest
}) => (
  <Autocomplete
    multiple
    options={options}
    value={value}
    onChange={onAddOption}
    limitTags={3}
    noOptionsText="No tags found"
    getOptionLabel={option => option.title}
    sx={{width: '500px'}}
    renderInput={params => (
      <TextField
        {...params}
        label={label}
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

export default MultipleAutocomplete;
