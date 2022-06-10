import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import {InputAdornment} from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import SearchIcon from '@mui/icons-material/Search';

import {
  StyledInputContent,
  StyledTextField,
  StyledIcon
} from 'components/Common/DataGrid/Filters/MultipleAutocomplete/styles';

const getInputValue = (id, values) =>
  values.length > 1 ? `${values.length} ${id} selected` : values[0].label;

const InputIcon = ({isRemove, onRemove}) => {
  if (isRemove) {
    return (
      <StyledIcon id="remove-icon" data-testid="remove-icon" onClick={onRemove}>
        <CloseOutlinedIcon fontSize="small" />
      </StyledIcon>
    );
  }

  return <SearchIcon fontSize="small" />;
};

const InputContent = ({content, toggle}) => (
  <StyledInputContent id="selected-value" data-testid="selected-value" onClick={toggle}>
    {content}
  </StyledInputContent>
);

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
              <InputContent content={startAdornment} toggle={toggleAutocomplete} />
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
