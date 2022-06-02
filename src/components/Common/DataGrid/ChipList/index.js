import React from 'react';
import {Box, Chip} from '@mui/material';
import PropTypes from 'prop-types';

const ChipList = ({value}) => (
  <Box display="flex" gap="5px" overflow="hidden">
    {value.map((item, index) => (
      <Chip size="small" key={index} label={item.name} variant="outlined" />
    ))}
  </Box>
);

ChipList.defaultProps = {
  value: []
};

ChipList.propTypes = {
  value: PropTypes.array
};

export default ChipList;
