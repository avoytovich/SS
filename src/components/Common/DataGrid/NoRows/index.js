import * as React from 'react';
import {Box, Typography} from '@mui/material';
import PropTypes from 'prop-types';

import {ButtonText} from 'components/Button';

function NoRows({emptyMessage, actionTitle, isAction, onAddNewRow, ...rest}) {
  return (
    <Box {...rest}>
      <Typography color="gray" data-testid="no-rows-title">
        {emptyMessage}
      </Typography>
      {isAction && (
        //  TODO refactor to use styled-components
        <ButtonText style={{zIndex: 100}} data-testid="no-rows-btn" onClick={onAddNewRow}>
          {actionTitle}
        </ButtonText>
      )}
    </Box>
  );
}

NoRows.propTypes = {
  emptyMessage: PropTypes.string,
  actionTitle: PropTypes.string,
  isAction: PropTypes.bool,
  onAddNewRow: PropTypes.func
};

NoRows.defaultProps = {
  emptyMessage: 'No rows',
  isAction: false,
  actionTitle: '',
  onAddNewRow: () => {}
};

export default NoRows;
