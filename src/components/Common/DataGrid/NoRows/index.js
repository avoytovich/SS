import * as React from 'react';
import {Box, Button, Typography} from '@mui/material';
import PropTypes from 'prop-types';

export function NoRows({emptyMessage, actionTitle, isAction, onAddNewRow, ...rest}) {
  return (
    <Box {...rest}>
      <Typography color="gray" data-testid="no-rows-title">
        {emptyMessage}
      </Typography>
      {isAction && (
        <Button
          variant="text"
          style={{zIndex: 100}}
          data-testid="no-rows-btn"
          onClick={onAddNewRow}
        >
          {actionTitle}
        </Button>
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
