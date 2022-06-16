import {makeStyles} from '@mui/styles';
import {ERROR, INFO, SUCCESS, WARNING} from 'theme/colors';

const useStyles = makeStyles({
  success: {backgroundColor: SUCCESS},
  error: {backgroundColor: ERROR},
  warning: {backgroundColor: WARNING},
  info: {backgroundColor: INFO}
});

export default useStyles;
