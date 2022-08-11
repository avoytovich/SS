import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';
import {InputAdornment, TextField} from '@mui/material';

import {CloseIcon, SearchIcon} from 'components/Icons';
import {IconButton} from 'components/Button';

import InputContentStyled from './InputContent.styles';

const StyledTextField = styled(TextField, {
  shouldForwardProp: prop => prop !== 'disabled'
})(({theme, disabled, width}) => ({
  color: disabled ? theme.palette.common.black : theme.palette.primary.main,
  backgroundColor: disabled ? theme.palette.grey[50] : theme.palette.common.white,
  minWidth: width || 240,
  '.MuiOutlinedInput-root .MuiAutocomplete-input': {
    padding: '8.5px 2px',
    fontSize: 16
  }
}));

const getInputValue = (id, values) =>
  values.length > 1 ? `${values.length} ${id} selected` : values[0].label;

const InputIcon = ({isRemove, onRemove}) => {
  if (isRemove) {
    return (
      <IconButton id="remove-icon" data-testid="remove-icon" size="small" onClick={onRemove}>
        <CloseIcon />
      </IconButton>
    );
  }
  return (
    <IconButton id="search-icon" data-testid="search-icon" size="small" onClick={onRemove}>
      <SearchIcon />
    </IconButton>
  );
};

const AutocompleteInput = ({
  id,
  values,
  options,
  label,
  minWidth,
  onChange,
  onRemoveValues,
  toggleAutocompleteMenu,
  ...rest
}) => {
  const [value, setValue] = useState('');
  const inputLabel = !values?.length ? label : '';
  const startAdornment = values.length ? getInputValue(id, values) : '';

  useEffect(() => {
    const timeoutId = setTimeout(() => onChange(value), 1000);
    return () => clearTimeout(timeoutId);
  }, [value]);

  const toggleAutocomplete = () => toggleAutocompleteMenu(prevValue => !prevValue);

  const handleOnChange = event => setValue(event.target.value);

  return (
    <StyledTextField
      {...rest}
      hiddenLabel={true}
      width={minWidth}
      placeholder={inputLabel}
      variant="outlined"
      data-testid="multiple-autocomplete-input"
      onChange={handleOnChange}
      InputProps={{
        style: {padding: 0, paddingRight: 10},
        ...rest.InputProps,
        startAdornment: (
          <InputAdornment position="start">
            {startAdornment && (
              <InputContentStyled onClick={toggleAutocomplete}>{startAdornment}</InputContentStyled>
            )}
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <InputIcon isRemove={values.length} onRemove={onRemoveValues} />
          </InputAdornment>
        )
      }}
    />
  );
};

AutocompleteInput.propTypes = {
  values: PropTypes.arrayOf(PropTypes.object).isRequired,
  label: PropTypes.string.isRequired,
  minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onRemoveValues: PropTypes.func.isRequired,
  toggleAutocompleteMenu: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

AutocompleteInput.defaultProps = {
  minWidth: 240
};

export default React.memo(AutocompleteInput);
