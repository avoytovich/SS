import {makeStyles} from '@material-ui/core';

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
