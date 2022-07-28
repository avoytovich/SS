import {styled} from '@mui/material/styles';

import Typography from '../Typography';

// Heading specific styles should go here
const StyledHeading = styled(Typography)(() => ({
  fontWeight: 300,
  fontSize: '32px',
  lineHeight: '37px'
}));

// eslint-disable-next-line no-use-before-define
Heading.propTypes = {
  ...Typography.propTypes
};

function Heading(props) {
  const {children, ...restProps} = props;

  return (
    <StyledHeading {...restProps} variant="h1" component="h1">
      {children}
    </StyledHeading>
  );
}

export default Heading;
