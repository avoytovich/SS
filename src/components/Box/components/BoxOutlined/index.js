import {styled} from '@mui/material/styles';

import Box from '../Box';

// BoxContained specific styles should go here
const StyledBox = styled(Box)(() => ({
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: 8,
  minHeight: 87,
  position: 'relative'
}));

// eslint-disable-next-line no-use-before-define
BoxOutlined.propTypes = {
  ...Box.propTypes
};

function BoxOutlined(props) {
  const {children, ...restProps} = props;

  return (
    <StyledBox {...restProps} variant="outlined">
      {children}
    </StyledBox>
  );
}

export default BoxOutlined;
