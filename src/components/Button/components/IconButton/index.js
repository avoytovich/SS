import PropTypes from 'prop-types';
import MuiIconButton from '@mui/material/IconButton';
import {styled} from '@mui/material/styles';

const iconSizes = {
  small: '18px',
  medium: '24px',
  large: '28px'
};

const StyledIconButton = styled(MuiIconButton, {
  shouldForwardProp: prop => prop !== 'size'
})(({size}) => ({
  svg: {
    fontSize: iconSizes[size]
  }
}));

const IconButton = props => {
  const {children, ...restProps} = props;

  return <StyledIconButton {...restProps}>{children}</StyledIconButton>;
};

IconButton.propTypes = {
  children: PropTypes.node,
  size: PropTypes.string
};

IconButton.defaultProps = {
  size: 'medium'
};

export default IconButton;
