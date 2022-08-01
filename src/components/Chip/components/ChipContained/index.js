import clsx from 'clsx';
import {styled} from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';

import Chip from '../Chip';

// ChipContained specific styles should go here
const StyledChip = styled(Chip)(props => ({
  color: '#FFFFFF',
  background: props.theme.palette.primary.main,
  '&:hover': {
    background: props.theme.palette.primary.dark
  },
  '&.selected': {
    background: props.theme.palette.primary.dark
  },
  '& .MuiSvgIcon-root': {
    color: '#FFFFFF',
    '&:hover': {
      color: '#FFFFFF'
    }
  },
  '& .MuiChip-deleteIcon': {
    color: '#FFFFFF',
    '&:hover': {
      color: '#FFFFFF'
    }
  }
}));

// eslint-disable-next-line no-use-before-define
ChipContained.propTypes = {
  ...Chip.propTypes
};

function ChipContained(props) {
  const {selected, ...restProps} = props;

  return (
    <StyledChip
      {...restProps}
      className={clsx({selected})}
      icon={selected ? <CheckIcon /> : null}
    />
  );
}

export default ChipContained;
