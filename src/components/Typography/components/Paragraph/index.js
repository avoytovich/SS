import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';

import Typography from '../Typography';

const StyledParagraph = styled(Typography)(({theme}) => ({
  '&.MuiTypography-body1': {
    fontSize: '16px',
    lineHeight: '24px'
  },
  '&.MuiTypography-body2': {
    fontSize: '14px',
    lineHeight: '20px',
    color: theme.palette.grey[600]
  }
}));

// eslint-disable-next-line no-use-before-define
Paragraph.propTypes = {
  ...Typography.propTypes,
  size: PropTypes.oneOf(['lg', 'sm'])
};

// eslint-disable-next-line no-use-before-define
Paragraph.defaultProps = {
  size: 'lg'
};

function Paragraph(props) {
  const {children, size, ...restProps} = props;

  const variant = size === 'sm' ? 'body2' : 'body1';

  return (
    <StyledParagraph {...restProps} variant={variant} component="p">
      {children}
    </StyledParagraph>
  );
}

export default Paragraph;
