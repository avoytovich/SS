import MuiChip from '@mui/material/Chip';
import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';

import {CloseIcon} from 'components/Icons';

// common MuiChip styles should go here
const StyledMuiChip = styled(MuiChip)(() => ({
  borderRadius: 18,
  fontSize: '12px',
  lineHeight: '16px',
  padding: '4px 7px',
  minWidth: '32px',
  margin: '4px 2px',
  '& .MuiChip-label': {
    padding: 0
  },
  '& .MuiSvgIcon-root': {
    fontSize: '16px',
    margin: '0 5px 0 0',
    '&.MuiChip-deleteIcon': {
      fontSize: '16px',
      margin: '0 0 0 5px'
    }
  }
}));

// eslint-disable-next-line no-use-before-define
Chip.propTypes = {
  deleteIcon: PropTypes.element
};

// eslint-disable-next-line no-use-before-define
Chip.defaultProps = {
  deleteIcon: <CloseIcon />
};

function Chip(props) {
  const {deleteIcon, ...restProps} = props;

  return <StyledMuiChip {...restProps} deleteIcon={deleteIcon} />;
}

export default Chip;
