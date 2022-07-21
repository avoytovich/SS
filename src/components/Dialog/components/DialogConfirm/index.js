import PropTypes from 'prop-types';
import {useMemo} from 'react';

import DialogBasic from '../DialogBasic';

import Actions from './components/Actions';

// eslint-disable-next-line no-use-before-define
DialogConfirm.propTypes = {
  ...DialogBasic.propTypes,
  cancelButtonContent: PropTypes.string,
  cancelButtonDisabled: PropTypes.bool,
  confirmButtonContent: PropTypes.string,
  confirmButtonDisabled: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
};

// eslint-disable-next-line no-use-before-define
DialogConfirm.defaultProps = {
  cancelButtonContent: 'Cancel',
  cancelButtonDisabled: false,
  confirmButtonContent: 'Confirm',
  confirmButtonDisabled: false
};

function DialogConfirm(props) {
  const {
    cancelButtonContent,
    cancelButtonDisabled,
    children,
    confirmButtonContent,
    confirmButtonDisabled,
    onCancel,
    onConfirm,
    severity,
    ...restProps
  } = props;

  const actions = useMemo(
    () => (
      <Actions
        onPrimaryButtonClick={onConfirm}
        onSecondaryButtonClick={onCancel}
        primaryButtonContent={confirmButtonContent}
        primaryButtonDisabled={confirmButtonDisabled}
        secondaryButtonContent={cancelButtonContent}
        secondaryButtonDisabled={cancelButtonDisabled}
        severity={severity}
      />
    ),
    [
      cancelButtonContent,
      cancelButtonDisabled,
      confirmButtonContent,
      confirmButtonDisabled,
      onCancel,
      onConfirm,
      severity
    ]
  );

  return (
    <DialogBasic {...restProps} actions={actions} severity={severity}>
      {children}
    </DialogBasic>
  );
}

export default DialogConfirm;
