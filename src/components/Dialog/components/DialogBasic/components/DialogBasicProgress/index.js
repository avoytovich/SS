import MuiBox from '@mui/material/Box';
import MuiCircularProgress from '@mui/material/CircularProgress';
import {styled} from '@mui/material/styles';

const StyledMuiBox = styled(MuiBox)(() => ({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'nowrap',
  justifyContent: 'center'
}));

function DialogBasicProgress() {
  return (
    <StyledMuiBox>
      <MuiCircularProgress size={64} />
    </StyledMuiBox>
  );
}

export default DialogBasicProgress;
