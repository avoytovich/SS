// common MuiTypography styles should go here
import {styled} from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const StyledMuiTypography = styled(Typography)(() => ({
  '&.MuiTypography-h1': {
    fontWeight: 300,
    fontSize: '32px',
    lineHeight: '37px',
    color: '#000000'
  },
  '&.MuiTypography-subtitle1': {
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '18px',
    color: '#000000'
  },
  '&.MuiTypography-subtitle2': {
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '14px',
    color: 'rgba(0, 0, 0, 0.5)'
  }
}));

export default StyledMuiTypography;
