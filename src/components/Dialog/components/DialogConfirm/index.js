import PropTypes from 'prop-types';
import {useMemo} from 'react';

import DialogBasic from '../DialogBasic';

import DialogConfirmActions from './components/DialogConfirmActions';
import SEVERITY from './constants';

// eslint-disable-next-line no-use-before-define
DialogConfirm.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
  onPrimaryButtonClick: PropTypes.func.isRequired,
  onSecondaryButtonClick: PropTypes.func.isRequired,
  primaryButtonContent: PropTypes.string.isRequired,
  primaryButtonDisabled: PropTypes.bool,
  secondaryButtonContent: PropTypes.string.isRequired,
  secondaryButtonDisabled: PropTypes.bool,
  severity: PropTypes.oneOf([SEVERITY.ERROR, SEVERITY.NONE]),
  title: PropTypes.string
};

// eslint-disable-next-line no-use-before-define
DialogConfirm.defaultProps = {
  primaryButtonDisabled: false,
  secondaryButtonDisabled: false,
  severity: SEVERITY.NONE
};

function DialogConfirm(props) {
  const {
    children,
    onClose,
    onPrimaryButtonClick,
    onSecondaryButtonClick,
    primaryButtonContent,
    primaryButtonDisabled,
    secondaryButtonContent,
    secondaryButtonDisabled,
    severity,
    title,
    ...restProps
  } = props;

  const actions = useMemo(
    () => (
      <DialogConfirmActions
        onPrimaryButtonClick={onPrimaryButtonClick}
        onSecondaryButtonClick={onSecondaryButtonClick}
        primaryButtonContent={primaryButtonContent}
        primaryButtonDisabled={primaryButtonDisabled}
        secondaryButtonContent={secondaryButtonContent}
        secondaryButtonDisabled={secondaryButtonDisabled}
        severity={severity}
      />
    ),
    [
      onPrimaryButtonClick,
      onSecondaryButtonClick,
      primaryButtonContent,
      primaryButtonDisabled,
      secondaryButtonContent,
      secondaryButtonDisabled,
      severity
    ]
  );

  return (
    <DialogBasic {...restProps} actions={actions} onClose={onClose} title={title}>
      {children}
    </DialogBasic>
  );
}

export default DialogConfirm;
