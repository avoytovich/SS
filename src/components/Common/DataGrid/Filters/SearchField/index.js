import * as React from 'react';
import PropTypes from 'prop-types';

import TextField from '@mui/material/TextField';
import {InputAdornment} from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import {StyledIcon} from 'components/Common/DataGrid/Filters/MultipleAutocomplete/styles';

export function SearchField({value, id, label, minWidth, size, onChange, onClear}) {
  const ClearFieldButton = (
    <StyledIcon data-testid={`${id}-remove-btn`} aria-label="delete" size="small" onClick={onClear}>
      <CloseOutlinedIcon fontSize="small" />
    </StyledIcon>
  );

  const handleTagSearch = e => onChange(e.target.value);

  return (
    <TextField
      id={id}
      data-testid={`${id}-input`}
      placeholder={label}
      sx={{minWidth}}
      size={size}
      onChange={handleTagSearch}
      value={value}
      InputProps={{
        endAdornment: <InputAdornment position="end">{value && ClearFieldButton}</InputAdornment>
      }}
    />
  );
}

SearchField.propTypes = {
  value: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func
};

SearchField.defaultProps = {
  id: 'search-field',
  label: 'Label',
  size: 'small',
  minWidth: '233px',
  onClear: () => {}
};
