import {styled} from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';

const CardHeaderStyled = styled(CardHeader)(({theme}) => ({
  color: theme.palette.primary.main,
  margin: '0',
  padding: '16px 16px 0',
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: '36px',
  lineHeight: '41px',
  fontFamily: theme.typography.fontFamily
}));

export default CardHeaderStyled;
