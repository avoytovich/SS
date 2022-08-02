import {styled} from '@mui/material/styles';

import {Paragraph} from 'components/Typography';

const OptionTypographyStyled = styled(Paragraph)(() => ({
  paddingLeft: '6px',
  width: 300,
  fontSize: 14,
  fontWeight: 300,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}));

export default OptionTypographyStyled;
