import PropTypes from 'prop-types';

import EmptyStatus from 'components/EmptyStatus';
import {ButtonText} from 'components/Button';
import {Typography} from 'components/Typography';

function NoRowsOverlay({emptyMessage, actionTitle, onClick, ...rest}) {
  return (
    <EmptyStatus {...rest}>
      <Typography color="gray" data-testid="no-rows-title">
        {emptyMessage}
      </Typography>
      {actionTitle && (
        <ButtonText data-testid="no-rows-btn" onClick={onClick}>
          {actionTitle}
        </ButtonText>
      )}
    </EmptyStatus>
  );
}

NoRowsOverlay.propTypes = {
  emptyMessage: PropTypes.string,
  actionTitle: PropTypes.string,
  onClick: PropTypes.func
};

NoRowsOverlay.defaultProps = {
  emptyMessage: 'No rows',
  actionTitle: '',
  onClick: () => {}
};

export default NoRowsOverlay;
