import {styled} from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';

const CardContentStyled = styled(CardContent)({
  '&:last-child': {
    paddingBottom: '16px'
  }
});

export default CardContentStyled;
