import {styled} from '@mui/material/styles';
import {Box} from '@mui/material';

const FooterBox = styled(Box)({
  flex: 0,
  display: 'flex',
  flexDirection: 'row',
  marginBottom: 2,
  textAlign: 'left',
  padding: '15px 24px'
});

const BoxStyled = styled(Box)({
  display: 'inline-flex',
  alignSelf: 'flex-end',
  lineHeight: '27px',
  marginLeft: 'auto',
  marginRight: 0
});

export {BoxStyled};

export default FooterBox;
