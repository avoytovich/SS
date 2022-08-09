import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';

const iconSizes = {
  small: '18px',
  medium: '24px',
  large: '28px'
};

const StyledIconButton = styled('span', {
  shouldForwardProp: prop => prop !== 'justifyContent' && prop !== 'size' && prop !== 'color'
})(({theme, justifyContent, size, color}) => ({
  display: 'flex',
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent,
  svg: {
    fontSize: iconSizes[size]
  },
  'svg > path': {
    fill: color || theme.palette.grey[600]
  },
  '&:hover': {
    'svg > path': {
      fill: theme.palette.primary.main
    }
  }
}));

const IconButton = props => {
  const {children, ...restProps} = props;

  return <StyledIconButton {...restProps}>{children}</StyledIconButton>;
};

IconButton.propTypes = {
  children: PropTypes.node,
  justifyContent: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string
};

IconButton.defaultProps = {
  justifyContent: 'center',
  size: 'medium'
};

export default IconButton;
