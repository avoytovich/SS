import MuiDialog from '@mui/material/Dialog';
import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';

// common MuiDialog styles should go here
const StyledMuiDialog = styled(MuiDialog)(() => ({}));

// eslint-disable-next-line no-use-before-define
Dialog.propTypes = {
  children: PropTypes.node
};

function Dialog(props) {
  const {children, ...restProps} = props;

  return <StyledMuiDialog {...restProps}>{children}</StyledMuiDialog>;
}

export default Dialog;
