import PropTypes from 'prop-types';
import MuiTab from '@mui/material/Tab';
import {styled} from '@mui/material/styles';
import {blue} from '@mui/material/colors';

const StyledTab = styled(props => <MuiTab disableRipple {...props} />)(({theme}) => ({
  minHeight: 'auto',
  minWidth: 'auto',
  padding: '8px 16px',
  borderRadius: 8,
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightRegular,
  lineHeight: '18px',
  fontSize: '16px',
  color: 'rgba(0, 0, 0, 0.5)',
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    backgroundColor: blue[50]
  },
  '&.Mui-focusVisible': {
    backgroundColor: blue[50]
  }
}));

const Tab = props => {
  const {children, ...restProps} = props;

  return <StyledTab {...restProps}>{children}</StyledTab>;
};

Tab.propTypes = {
  children: PropTypes.node
};

export default Tab;
