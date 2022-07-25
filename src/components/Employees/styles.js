import {makeStyles} from '@material-ui/core';
import {styled} from '@mui/material/styles';

export const useStyles = makeStyles(() => ({
  filterSearchContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  filterClearContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: '16px'
  },
  filtersContainer: {
    display: 'flex',
    flexDirection: 'row',
    minWidth: 240,
    flexWrap: 'wrap',
    gap: '8px'
  }
}));

export const StyledIcon = styled('span')(({theme}) => ({
  display: 'flex',
  cursor: 'pointer',
  fontSize: '8px',
  '.MuiSvgIcon-root': {
    fontSize: '16px'
  },
  'svg > path': {
    fill: theme.palette.grey[600]
  },
  '&:hover': {
    'svg > path': {
      fill: theme.palette.grey[900]
    }
  }
}));
