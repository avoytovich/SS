import {styled} from '@mui/material/styles';

import Box from '../Box';

// BoxSubtitle specific styles should go here
const StyledBox = styled(Box)(() => ({
  minHeight: 46,
  marginBottom: 10
}));

// eslint-disable-next-line no-use-before-define
BoxSubtitle.propTypes = {
  ...Box.propTypes
};

function BoxSubtitle(props) {
  const {children, ...restProps} = props;

  return <StyledBox {...restProps}>{children}</StyledBox>;
}

export default BoxSubtitle;
