import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';

import {BoxOutlined} from 'components/Box';

// TapBox specific styles should go here
const StyledBox = styled(BoxOutlined)(() => ({
  position: 'absolute',
  left: '-1px',
  top: '-1px',
  right: '-1px',
  bottom: '-1px',
  fontWeight: 500,
  fontSize: '24px',
  lineHeight: '22px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: ' #0070AD',
  background: 'rgba(244, 251, 255, 0.9)',

  '&.green': {
    color: '#35A55A',
    background: 'rgba(247, 255, 247, 0.9)'
  },
  '&.dark': {
    color: '#2B0A3D',
    background: 'rgba(252, 249, 255, 0.9)'
  },
  '&.orange': {
    color: '#DE7311',
    background: 'rgba(255, 252, 245, 0.9)'
  }
}));

// eslint-disable-next-line no-use-before-define
TapBox.propTypes = {
  ...BoxOutlined.propTypes,
  color: PropTypes.oneOf(['orange', 'dark', 'green', 'blue'])
};

// eslint-disable-next-line no-use-before-define
TapBox.defaultProps = {
  color: 'blue'
};

function TapBox(props) {
  const {children, color, ...restProps} = props;

  return (
    <StyledBox {...restProps} className={color}>
      {children}
    </StyledBox>
  );
}

export default TapBox;
