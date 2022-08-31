import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';
import {Grid} from '@mui/material';

import {Box} from 'components/Box';
import {Subtitle} from 'components/Typography';
import {ChipOutlined} from 'components/Chip';

const StyledRejectedBox = styled(Box)(() => ({
  height: '100%'
}));

const ChipContainer = ({values}) => {
  if (!values?.length) return <Subtitle>N/A</Subtitle>;

  return values?.map(value => <ChipOutlined key={value.id} label={value.name} />);
};

const RejectedDetailItem = ({title, value, isValueList, ...rest}) => (
  <Grid item xs={12} md {...rest}>
    <StyledRejectedBox mb={2}>
      <Subtitle size="sm" mb={1}>
        {title}
      </Subtitle>
      {isValueList ? <ChipContainer values={value} /> : <Subtitle>{value || 'N/A'}</Subtitle>}
    </StyledRejectedBox>
  </Grid>
);

RejectedDetailItem.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  isValueList: PropTypes.bool
};

export default RejectedDetailItem;
