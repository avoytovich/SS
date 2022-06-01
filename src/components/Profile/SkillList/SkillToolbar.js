import React from 'react';

import {GridToolbarContainer, GridToolbarColumnsButton} from '@mui/x-data-grid';
import {Box} from '@mui/material';

import {useStyles} from 'components/Profile/styles';

const SkillToolbar = ({setToolbarEl}) => {
  const classes = useStyles();

  return (
    <GridToolbarContainer className={classes.toolbarContainer}>
      <Box className={classes.toolbarBox} ref={setToolbarEl}>
        <GridToolbarColumnsButton sx={{mr: 2}} />
      </Box>
    </GridToolbarContainer>
  );
};

export default SkillToolbar;
