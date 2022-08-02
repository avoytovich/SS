import React from 'react';
import PropTypes from 'prop-types';
import {Checkbox} from '@mui/material';
import {styled} from '@mui/material/styles';

import OptionTypographyStyled from './OptionTypography.styles';

const StyledLi = styled('li')(({theme}) => ({
  backgroundColor: theme.palette.common.white,
  padding: 0,
  '&.MuiAutocomplete-option': {
    margin: 0
  }
}));

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
      <OptionTypographyStyled data-testid="multiple-autocomplete-option-label" size="sm">
        {option.label}
      </OptionTypographyStyled>
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
