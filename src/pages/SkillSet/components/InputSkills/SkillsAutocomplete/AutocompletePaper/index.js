import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';
import {Paper} from '@mui/material';

import {ButtonText} from 'components/Button';

const PaperStyled = styled(Paper)(({theme}) => ({
  width: '360px',
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  '&.MuiAutocomplete-option': {
    borderBottom: `1px solid ${theme.palette.grey[200]}`
  }
}));

const AutocompletePaper = ({children, onClick}) => (
  <PaperStyled data-testid="skills-autocomplete-paper">
    {children}
    <ButtonText
      key="skill-set-propose-btn"
      fullWidth
      data-testid="skill-set-propose-btn"
      onMouseDown={event => event.preventDefault()}
      onClick={onClick}
    >
      Propose new skill
    </ButtonText>
  </PaperStyled>
);

AutocompletePaper.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired
};

export default AutocompletePaper;
