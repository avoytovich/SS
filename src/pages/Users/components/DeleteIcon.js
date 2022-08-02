import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {styled} from '@mui/material/styles';

const IconStyled = styled('span')(({theme}) => ({
  display: 'flex',
  cursor: 'pointer',
  justifyContent: 'flex-end',
  '& svg': {
    fontSize: '18px'
  },
  '&:hover': {
    'svg > path': {
      fill: theme.palette.primary.main
    }
  }
}));

const DeleteIcon = props => (
  <IconStyled {...props}>
    <DeleteOutlinedIcon />
  </IconStyled>
);

export default DeleteIcon;
