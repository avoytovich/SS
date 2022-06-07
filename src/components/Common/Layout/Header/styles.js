import {styled, alpha} from '@mui/material/styles';
import {makeStyles} from '@material-ui/core';
import {grey} from '@mui/material/colors';
import Menu from '@mui/material/Menu';

export const useStyles = makeStyles(() => ({
  active: {
    backgroundColor: 'none'
  },
  navContent: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    '& .MuiLink-root': {
      color: `${grey[500]}!important`
    },
    '& .MuiLink-root.active': {
      fontWeight: '400!important',
      color: `${grey[900]}!important`
    }
  }
}));

export const StyledMenu = styled(props => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    {...props}
  />
))(({theme}) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0'
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5)
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
      }
    }
  }
}));
