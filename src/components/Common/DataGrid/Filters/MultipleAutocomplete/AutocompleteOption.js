import React from 'react';
import PropTypes from 'prop-types';

import {Checkbox} from '@mui/material';

import {
  StyledTypography,
  StyledLi
} from 'components/Common/DataGrid/Filters/MultipleAutocomplete/styles';

const AutocompleteOption = ({values, option, onSelect, onRemove, ...rest}) => {
  const isChecked = values.some(value => value.id === option.id);

  const onSelectOption = () => {
    if (isChecked) {
      return onRemove(option);
    }
    return onSelect(option);
  };

  return (
    <StyledLi data-testid="multiple-autocomplete-option" {...rest} onClick={onSelectOption}>
      <Checkbox color="info" size="small" checked={isChecked} sx={{padding: 0}} />
      <StyledTypography variant="body2" data-testid="multiple-autocomplete-option-label">
        {option.label}
      </StyledTypography>
    </StyledLi>
  );
};

AutocompleteOption.propTypes = {
  option: PropTypes.object.isRequired,
  values: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default React.memo(AutocompleteOption);
