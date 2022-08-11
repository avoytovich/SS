import * as React from 'react';
import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import {InputAdornment} from '@mui/material';

import {CloseIcon} from 'components/Icons';
import {IconButton} from 'components/Button';

const StyledTextField = styled(TextField, {
  shouldForwardProp: prop => prop !== 'width'
})(({width}) => ({
  minWidth: width,
  '.MuiOutlinedInput-root': {
    paddingRight: 8
  }
}));

function SearchField({value, id, label, minWidth, size, onChange, onClear, ...rest}) {
  const ClearFieldButton = (
    <IconButton data-testid={`${id}-remove-btn`} size="small" aria-label="delete" onClick={onClear}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  const handleTagSearch = e => onChange(e.target.value);

  return (
    <StyledTextField
      id={id}
      data-testid={`${id}-input`}
      placeholder={label}
      width={minWidth}
      size={size}
      onChange={handleTagSearch}
      value={value}
      {...rest}
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
  minWidth: '238px',
  onClear: () => {}
};

export default SearchField;
