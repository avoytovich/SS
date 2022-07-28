import {styled} from '@mui/material/styles';

import Chip from '../Chip';

// ChipContained specific styles should go here
const StyledChip = styled(Chip)(props => ({
  color: '#FFFFFF',
  background: props.theme.palette.primary.main,
  '& .MuiChip-deleteIcon': {
    color: '#FFFFFF'
  }
}));

// eslint-disable-next-line no-use-before-define
ChipContained.propTypes = {
  ...Chip.propTypes
};

function ChipContained(props) {
  const {...restProps} = props;

  return <StyledChip {...restProps} />;
}

export default ChipContained;
