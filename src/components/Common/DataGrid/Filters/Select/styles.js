import {makeStyles} from '@material-ui/core';
import {styled} from '@mui/material/styles';

export const selectStyles = {
  '.MuiSelect-select': {
    paddingRight: '4px !important'
  },
  '.MuiOutlinedInput-input': {
    padding: '8.5px 9px'
  },
  '.MuiSvgIcon-root': {
    right: '3px'
  }
};

export const useStyles = makeStyles(theme => ({
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  menuPaper: {
    '& ul': {
      minWidth: '220px !important',
      maxHeight: 400
    }
  },
  marginMenuPaper: {
    marginLeft: '20px !important',
    '& ul': {
      minWidth: '220px !important',
      maxHeight: 400
    }
  }
}));

export const StyledIcon = styled('span')(({theme}) => ({
  display: 'flex',
  cursor: 'pointer',
  alignItems: 'center',
  zIndex: 1000,
  '& svg': {
    fontSize: '18px'
  },
  '&:hover': {
    'svg > path': {
      fill: theme.palette.primary.main
    }
  }
}));
