import MuiDialogActions from '@mui/material/DialogActions';
import MuiStack from '@mui/material/Stack';
import PropTypes from 'prop-types';

import {ButtonContained, ButtonOutlined} from 'components/Button';

import SEVERITY from '../../constants';

// eslint-disable-next-line no-use-before-define
DialogConfirmActions.propTypes = {
  onPrimaryButtonClick: PropTypes.func.isRequired,
  onSecondaryButtonClick: PropTypes.func.isRequired,
  primaryButtonContent: PropTypes.string.isRequired,
  primaryButtonDisabled: PropTypes.bool,
  secondaryButtonContent: PropTypes.string.isRequired,
  secondaryButtonDisabled: PropTypes.bool,
  severity: PropTypes.oneOf([SEVERITY.ERROR, SEVERITY.NONE])
};

// eslint-disable-next-line no-use-before-define
DialogConfirmActions.defaultProps = {
  primaryButtonDisabled: false,
  secondaryButtonDisabled: false,
  severity: SEVERITY.NONE
};

function DialogConfirmActions(props) {
  const {
    onPrimaryButtonClick,
    onSecondaryButtonClick,
    primaryButtonContent,
    primaryButtonDisabled,
    secondaryButtonContent,
    secondaryButtonDisabled,
    severity
  } = props;

  const primaryButtonColor = severity === SEVERITY.ERROR ? 'error' : 'primary';

  return (
    <MuiDialogActions>
      <MuiStack direction="row" spacing={2}>
        <ButtonOutlined disabled={secondaryButtonDisabled} onClick={onSecondaryButtonClick}>
          {secondaryButtonContent}
        </ButtonOutlined>

        <ButtonContained
          color={primaryButtonColor}
          disabled={primaryButtonDisabled}
          onClick={onPrimaryButtonClick}
        >
          {primaryButtonContent}
        </ButtonContained>
      </MuiStack>
    </MuiDialogActions>
  );
}

export default DialogConfirmActions;
