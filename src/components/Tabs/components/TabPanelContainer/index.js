import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';

import {Box} from 'components/Box';

const StyledBox = styled(Box)(({theme}) => ({
  height: '100%',
  padding: '16px',
  borderRadius: 4,
  background: theme.palette.common.white
}));

const TabPanelContainer = props => {
  const {children, ...restProps} = props;

  return <StyledBox {...restProps}>{children}</StyledBox>;
};

TabPanelContainer.propTypes = {
  children: PropTypes.node
};

export default TabPanelContainer;
