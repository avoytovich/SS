import {Box, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';

export const StyledBox = styled(Box)(() => ({
  padding: '12px',
  backgroundColor: '#F4F3F3'
}));

export const StyledSkillsBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  margin: '8px 0',
  flexWrap: 'wrap',
  gap: '10px'
}));

export const StyledTypography = styled(Typography)(() => ({
  color: 'rgba(0, 0, 0, 0.5)'
}));
