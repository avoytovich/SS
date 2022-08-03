import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';

const AutocompleteOptionStyled = styled('li')(({theme}) => ({
  backgroundColor: theme.palette.common.white,
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  padding: 0,
  '&.MuiAutocomplete-option': {
    margin: 0
  }
}));

const AutocompleteOption = ({children, ...props}) => (
  <AutocompleteOptionStyled {...props}>{children}</AutocompleteOptionStyled>
);

AutocompleteOption.propTypes = {
  children: PropTypes.node
};

export default AutocompleteOption;
