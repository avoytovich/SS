import {makeStyles} from '@material-ui/core';
import themeConfig from 'theme/themeConfig';

const useStyles = makeStyles({
  contentWrapper: {
    marginBottom: '32px',
    padding: '10px 0',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: themeConfig.palette.background.paper,
    borderRadius: '6px',
    minHeight: '200px'
  }
});

export default useStyles;
