import React from 'react';
import PropTypes from 'prop-types';

import {Box} from 'components/Box';
import {ChipOutlined} from 'components/Chip';

const ChipList = ({values}) => (
  <Box>
    {values && values.map(item => <ChipOutlined size="small" key={item.name} label={item.name} />)}
  </Box>
);

ChipList.defaultProps = {
  values: []
};

ChipList.propTypes = {
  values: PropTypes.array
};

export default ChipList;
