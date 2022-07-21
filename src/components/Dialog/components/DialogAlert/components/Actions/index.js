import MuiDialogActions from '@mui/material/DialogActions';
import PropTypes from 'prop-types';

import {SEVERITY} from 'components/constants';
import {ButtonContained} from 'components/Button';

// eslint-disable-next-line no-use-before-define
Actions.propTypes = {
  onPrimaryButtonClick: PropTypes.func.isRequired,
  primaryButtonContent: PropTypes.string.isRequired,
  severity: PropTypes.oneOf([SEVERITY.ERROR, SEVERITY.NONE])
};

// eslint-disable-next-line no-use-before-define
Actions.defaultProps = {
  severity: SEVERITY.NONE
};

function Actions(props) {
  const {onPrimaryButtonClick, primaryButtonContent, severity} = props;

  const primaryButtonColor = severity === SEVERITY.ERROR ? 'error' : 'primary';

  return (
    <MuiDialogActions>
      <ButtonContained color={primaryButtonColor} onClick={onPrimaryButtonClick}>
        {primaryButtonContent}
      </ButtonContained>
    </MuiDialogActions>
  );
}

export default Actions;
