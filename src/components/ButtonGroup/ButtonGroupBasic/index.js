import PropTypes, {oneOf} from 'prop-types';
import {styled} from '@mui/material/styles';

import ButtonGroup from '../ButtonGroup';

// common MuiButtonGroupBasic styles should go here
const StyledButtonGroupBasic = styled(ButtonGroup)(() => ({
  justifyContent: 'flex-end',
  display: 'flex',
  width: '100%',
  margin: '16px 0',

  '& .MuiButton-root': {
    marginLeft: '10px'
  },
  '&.right': {
    '& .MuiButton-root': {
      marginLeft: '0px',
      marginRight: '10px'
    }
  },
  '&.center': {
    '& .MuiButton-root': {
      marginRight: '10px'
    }
  }
}));

// eslint-disable-next-line no-use-before-define
ButtonGroupBasic.propTypes = {
  children: PropTypes.node,
  position: oneOf(['left', 'right', 'center'])
};

// eslint-disable-next-line no-use-before-define
ButtonGroupBasic.defaultProps = {
  position: 'left'
};

function ButtonGroupBasic(props) {
  const {children, position, ...restProps} = props;

  return (
    <StyledButtonGroupBasic classnames={position} {...restProps}>
      {children}
    </StyledButtonGroupBasic>
  );
}

export default ButtonGroupBasic;
