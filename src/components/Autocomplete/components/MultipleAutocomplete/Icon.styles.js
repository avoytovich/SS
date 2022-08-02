import {styled} from '@mui/material/styles';

const IconStyled = styled('span')(({theme}) => ({
  display: 'flex',
  cursor: 'pointer',
  alignItems: 'center',
  '& svg': {
    fontSize: '18px'
  },
  '&:hover': {
    'svg > path': {
      fill: theme.palette.primary.main
    }
  }
}));

export default IconStyled;
