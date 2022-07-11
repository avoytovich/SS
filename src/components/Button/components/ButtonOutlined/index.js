import {styled} from '@mui/material/styles';

import Button from '../Button';

// ButtonContained specific styles should go here
const StyledButton = styled(Button)(() => ({
  borderRadius: 40
}));

// eslint-disable-next-line no-use-before-define
ButtonOutlined.propTypes = {
  ...Button.propTypes
};

function ButtonOutlined(props) {
  const {children, ...restProps} = props;

  return (
    <StyledButton {...restProps} variant="outlined">
      {children}
    </StyledButton>
  );
}

export default ButtonOutlined;
