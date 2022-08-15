import {styled} from '@mui/material/styles';

import {Box} from 'components/Box';

const StyledTabPanel = styled(Box)(() => ({
  height: '100%'
}));

const TabPanel = props => {
  const {children, value, index, ...other} = props;

  return (
    <StyledTabPanel
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && children}
    </StyledTabPanel>
  );
};

export default TabPanel;
