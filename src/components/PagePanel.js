import { styled, withTheme } from '@material-ui/core/styles';
import Box from '@mui/material/Box';

export const PagePanel = styled(withTheme(Box))(({ theme }) => ({
  marginBottom: '32px',
  padding: '10px 0',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '6px',
}));
