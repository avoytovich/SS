import React from 'react';
import {Box, Chip} from '@mui/material';
import PropTypes from 'prop-types';

const ChipList = ({values}) => (
  <Box display="flex" gap="5px" overflow="hidden">
    {values &&
      values.map(item => (
        <Chip size="small" key={item.name} label={item.name} variant="outlined" />
      ))}
  </Box>
);

ChipList.defaultProps = {
  values: []
};

ChipList.propTypes = {
  values: PropTypes.array
};

export default ChipList;
