import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  parentScrollContainer: {
    overflow: 'hidden',
    flexGrow: 1,
    minHeight: '250px',
    position: 'relative',
  },
  parentScroll: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'auto',
  },
  centerContent: {
    justifyContent: 'center',
    margin: 'auto',
  },
  similarEngineerPaper: {
    padding: '20px',
    marginBottom: '10px',
  },
  similarEngineerDetails: {
    marginTop: '15px',
    display: 'flex',
    '& .MuiTypography-root': {
      marginRight: '15px',
    },
  },

  employeeListRadioContainer: {
    '& label': {
      alignItems: 'center',
    },
  },
  shape: {
    width: 40,
    height: 20,
    marginRight: 8,
    marginBottom: 4,
  },
  legendItem: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'flex-start',
    textAlign: 'left',
    alignItems: 'center',
  },
});
