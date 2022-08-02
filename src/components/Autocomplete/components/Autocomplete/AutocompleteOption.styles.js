import {styled} from '@mui/material/styles';

const AutocompleteOptionStyled = styled('li')(({theme}) => ({
  backgroundColor: theme.palette.common.white,
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  padding: 0,
  '&.MuiAutocomplete-option': {
    margin: 0
  }
}));

export default AutocompleteOptionStyled;
