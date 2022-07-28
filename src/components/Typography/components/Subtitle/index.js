import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';

import Typography from '../Typography';

// Subtitle specific styles should go here
const StyledSubtitle = styled(Typography)(() => ({
  '&.MuiTypography-subtitle1': {
    fontSize: '16px',
    marginBottom: 2,
    lineHeight: '18px'
  },
  '&.MuiTypography-subtitle2': {
    fontSize: '12px',
    lineHeight: '14px',
    color: 'rgba(0, 0, 0, 0.5)'
  }
}));

// eslint-disable-next-line no-use-before-define
Subtitle.propTypes = {
  ...Typography.propTypes,
  size: PropTypes.oneOf(['lg', 'sm'])
};

// eslint-disable-next-line no-use-before-define
Subtitle.defaultProps = {
  size: 'lg'
};

function Subtitle(props) {
  const {children, size, ...restProps} = props;

  const variant = size === 'sm' ? 'subtitle2' : 'subtitle1';

  return (
    <StyledSubtitle {...restProps} variant={variant} component="p">
      {children}
    </StyledSubtitle>
  );
}

export default Subtitle;
