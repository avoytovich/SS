import MuiDialogTitle from '@mui/material/DialogTitle';
import MuiIconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';

import {CloseIcon} from 'components/Icons';

const StyledMuiIconButton = styled(MuiIconButton)(() => ({
  padding: 4,
  position: 'absolute',
  right: 4,
  top: 4
}));

// eslint-disable-next-line no-use-before-define
DialogBasicTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func
};

function DialogBasicTitle(props) {
  const {children, onClose} = props;

  return (
    <MuiDialogTitle>
      {children}

      {onClose ? (
        <StyledMuiIconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </StyledMuiIconButton>
      ) : null}
    </MuiDialogTitle>
  );
}

export default DialogBasicTitle;
