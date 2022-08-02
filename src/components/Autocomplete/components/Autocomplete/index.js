import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {Autocomplete, InputAdornment, TextField} from '@mui/material';
import {styled} from '@mui/material/styles';

import AutocompleteOptionStyled from './AutocompleteOption.styles';

const AutocompleteInputStyled = styled(TextField)(() => ({
  marginTop: '16px',
  '.MuiAutocomplete-input': {
    fontSize: 16
  }
}));

const SingleAutocomplete = ({
  name,
  options,
  label,
  minWidth,
  noOptionsText,
  onSelect,
  onSearch,
  ...props
}) => {
  const onInputChange = useCallback(
    value => {
      if (value && onSearch) {
        onSearch(value);
      }
    },
    [onSearch]
  );

  return (
    <Autocomplete
      id={name}
      data-testid={name}
      options={options}
      noOptionsText={noOptionsText}
      getOptionLabel={option => option.name}
      {...props}
      renderOption={(optionProps, option) => (
        <AutocompleteOptionStyled {...optionProps} onChange={onInputChange}>
          {option.name}
        </AutocompleteOptionStyled>
      )}
      onChange={onSelect}
      renderInput={params => (
        <AutocompleteInputStyled
          {...params}
          width={minWidth}
          placeholder={label}
          variant="outlined"
          hiddenLabel
          size="small"
          InputProps={{
            ...params.InputProps,
            endAdornment: <InputAdornment position="end" />
          }}
        />
      )}
    />
  );
};

SingleAutocomplete.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  noOptionsText: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  onSearch: PropTypes.func
};

SingleAutocomplete.defaultProps = {
  name: 'autocomplete',
  options: [],
  label: '',
  minWidth: 240,
  noOptionsText: 'Not found'
};

export default SingleAutocomplete;
