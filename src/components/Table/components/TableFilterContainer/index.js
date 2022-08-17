import {styled} from '@mui/material/styles';

import {Box} from '../../../Box';

const StyledTableFilterBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  margin: '8px 0 14px',
  flexWrap: 'wrap',
  gap: '10px'
}));

const FilterContainer = props => <StyledTableFilterBox component="form" {...props} />;

export default FilterContainer;
