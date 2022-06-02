import React, {useState} from 'react';

import {Box, Typography} from '@mui/material';
import {grey} from '@mui/material/colors';

import {Accordion, AccordionSummary, AccordionDetails} from './styles';

export default function Recommendations() {
  const [expanded, setExpanded] = useState('');

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : '');
  };

  return (
    <Box sx={{borderLeft: `1px solid ${grey[200]}`, flex: '2'}}>
      <Accordion expanded={expanded === 'matrix'} isHideBorder onChange={handleChange('matrix')}>
        <AccordionSummary aria-controls="matrix-content" id="matrix-header">
          <Typography>Recommendations based on Tech Matrix</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Tech Matrix content.</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'employees'} onChange={handleChange('employees')}>
        <AccordionSummary aria-controls="employees-content" id="employees-header">
          <Typography>Recommendations based on Employees DB</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Employees DB content.</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'projects'} onChange={handleChange('projects')}>
        <AccordionSummary aria-controls="projects-content" id="projects-header">
          <Typography>Recommendations based on Projects info</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Projects info content.</Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
