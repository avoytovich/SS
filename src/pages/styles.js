import {makeStyles} from '@material-ui/core';

import {GREY_4} from '../theme/colors';

const useStyles = makeStyles({
  flexColumn: {
    display: 'flex',
    flexDirection: 'column'
  },
  parentScrollContainer: {
    overflowY: 'scroll',
    flexGrow: 1,
    minHeight: '250px',
    position: 'relative'
  },
  parentScroll: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      backgroundColor: 'white',
      width: '16px'
    },
    '&::-webkit-scrollbar-track:vertical': {
      backgroundColor: 'white'
    },
    '&::-webkit-scrollbar-track:vertical:hover': {
      backgroundColor: 'white'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: GREY_4,
      borderRadius: '16px',
      border: '5px solid white'
    },
    '&::-webkit-scrollbar-button': {
      display: 'none'
    }
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto'
  },
  similarEngineerPaper: {
    padding: '20px',
    marginBottom: '10px'
  },
  similarEngineerDetails: {
    marginTop: '15px',
    display: 'flex',
    '& .MuiTypography-root': {
      marginRight: '15px'
    }
  },

  employeeListRadioContainer: {
    '& label': {
      alignItems: 'center'
    }
  },
  shape: {
    width: 40,
    height: 20,
    marginRight: 8,
    marginBottom: 4
  },
  legendItem: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'flex-start',
    textAlign: 'left',
    alignItems: 'center'
  }
});

export default useStyles;
