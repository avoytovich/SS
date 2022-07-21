import PropTypes from 'prop-types';
import {useMemo} from 'react';

import DialogBasic from '../DialogBasic';

import Actions from './components/Actions';

// eslint-disable-next-line no-use-before-define
DialogAlert.propTypes = {
  ...DialogBasic.propTypes,
  closeButtonContent: PropTypes.string,
  onClose: PropTypes.func.isRequired
};

// eslint-disable-next-line no-use-before-define
DialogAlert.defaultProps = {
  closeButtonContent: 'Ok'
};

function DialogAlert(props) {
  const {children, closeButtonContent, onClose, severity, ...restProps} = props;

  const actions = useMemo(
    () => (
      <Actions
        onPrimaryButtonClick={onClose}
        primaryButtonContent={closeButtonContent}
        severity={severity}
      />
    ),
    [closeButtonContent, onClose, severity]
  );

  return (
    <DialogBasic {...restProps} actions={actions} onClose={onClose} severity={severity}>
      {children}
    </DialogBasic>
  );
}

export default DialogAlert;
