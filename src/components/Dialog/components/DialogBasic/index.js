import MuiDialogContent from '@mui/material/DialogContent';
import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';

import Dialog from '../Dialog';

import DialogBasicProgress from './components/DialogBasicProgress';
import DialogBasicTitle from './components/DialogBasicTitle';

const StyledDialog = styled(Dialog)(() => ({
  '& .MuiDialog-paper': {
    minWidth: 256,
    position: 'relative'
  }
}));

// eslint-disable-next-line no-use-before-define
DialogBasic.propTypes = {
  actions: PropTypes.element,
  children: PropTypes.node,
  onClose: PropTypes.func,
  showProgress: PropTypes.bool,
  title: PropTypes.string
};

// eslint-disable-next-line no-use-before-define
DialogBasic.defaultProps = {
  showProgress: false
};

function DialogBasic(props) {
  const {actions, children, onClose, showProgress, title, ...restProps} = props;

  return (
    <StyledDialog {...restProps} onClose={onClose}>
      <DialogBasicTitle onClose={onClose}>{title}</DialogBasicTitle>

      <MuiDialogContent>{showProgress ? <DialogBasicProgress /> : children}</MuiDialogContent>

      {actions || null}
    </StyledDialog>
  );
}

export default DialogBasic;
