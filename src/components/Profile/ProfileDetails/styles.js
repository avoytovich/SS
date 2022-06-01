import * as React from 'react';
import {styled} from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import {grey} from '@mui/material/colors';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export const Accordion = styled(
  props => <MuiAccordion disableGutters elevation={0} square {...props} />,
  {
    shouldForwardProp: prop => prop !== 'isHideBorder'
  }
)(({theme, isHideBorder}) => ({
  borderTop: isHideBorder ? 0 : `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0
  },
  '&:before': {
    display: 'none'
  }
}));

export const AccordionSummary = styled(props => (
  <MuiAccordionSummary
    expandIcon={<ArrowRightIcon sx={{fontSize: '1.9rem', color: grey[400]}} />}
    {...props}
  />
))(({theme}) => ({
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)'
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1)
  }
}));

export const AccordionDetails = styled(MuiAccordionDetails)(({theme}) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)'
}));
