import {styled} from '@mui/material/styles';

import Button from '../Button';

// ButtonContained specific styles should go here
const StyledButton = styled(Button)(() => ({
  borderRadius: 40
}));

// eslint-disable-next-line no-use-before-define
ButtonContained.propTypes = {
  ...Button.propTypes
};

function ButtonContained(props) {
  const {children, ...restProps} = props;

  return (
    <StyledButton {...restProps} variant="contained">
      {children}
    </StyledButton>
  );
}

export default ButtonContained;
