import {styled} from '@mui/material/styles';

import {Button} from '../Button';

// ButtonText specific styles should go here
const StyledButton = styled(Button)(() => ({}));

// eslint-disable-next-line no-use-before-define
ButtonText.propTypes = {
  ...Button.propTypes
};

function ButtonText(props) {
  const {children, ...restProps} = props;

  return (
    <StyledButton {...restProps} variant="text">
      {children}
    </StyledButton>
  );
}

export {ButtonText};
