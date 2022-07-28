import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';

import {Box} from 'components/Box';

const StyledEmptyStatus = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
}));

const EmptyStatus = props => {
  const {children, ...restProps} = props;

  return <StyledEmptyStatus {...restProps}>{children}</StyledEmptyStatus>;
};

EmptyStatus.propTypes = {
  children: PropTypes.node
};

export default EmptyStatus;
