import PropTypes from 'prop-types';
import MuiTabs from '@mui/material/Tabs';
import {styled} from '@mui/material/styles';

const StyledTabs = styled(props => (
  <MuiTabs {...props} TabIndicatorProps={{children: <span className="MuiTabs-indicatorSpan" />}} />
))({
  '& .MuiTabs-indicator': {
    backgroundColor: 'transparent'
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    backgroundColor: 'none'
  }
});

const Tabs = props => {
  const {children, ...restProps} = props;

  return <StyledTabs {...restProps}>{children}</StyledTabs>;
};

Tabs.propTypes = {
  children: PropTypes.node
};

export default Tabs;
