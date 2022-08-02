import {styled} from '@mui/material/styles';

const InputContentStyled = styled('span')(({theme}) => ({
  maxWidth: 147,
  margin: 0,
  paddingLeft: 8,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontSize: 16,
  color: theme.palette.grey[700]
}));

export default InputContentStyled;
