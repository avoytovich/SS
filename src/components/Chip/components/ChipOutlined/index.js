import {styled} from '@mui/material/styles';

import Chip from '../Chip';

// ChipContained specific styles should go here
const StyledChip = styled(Chip)(() => ({
  borderRadius: 40,
  color: '#000000',
  '& .MuiChip-deleteIcon': {
    color: '#000000'
  }
}));

// eslint-disable-next-line no-use-before-define
ChipOutlined.propTypes = {
  ...Chip.propTypes
};

function ChipOutlined(props) {
  const {...restProps} = props;

  return <StyledChip {...restProps} variant="outlined" />;
}

export default ChipOutlined;
