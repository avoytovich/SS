import React from 'react';
import Typography from '@mui/material/Typography';
import {Box, Button} from '@mui/material';

import HelmetWrapper from '../../components/HelmetWrapper';
import {PagePanel} from 'components/PagePanel';

import CreateSkillModal from 'components/Skills/CreateSkillModal';
import {useModal} from 'hooks/useModal';
import SkillsList from 'components/Skills/SkillsList';

const Skills = () => {
  const createModal = useModal();

  const handleClickCreate = () => {
    createModal.toggle();
  };

  return (
    <>
      <HelmetWrapper title="Skills" />
      <Typography variant="h4" component="h1" margin="24px 0">
        Skills
      </Typography>

      <PagePanel>
        <Box display="flex" flexDirection="row-reverse" paddingRight="8px">
          <Button variant="contained" onClick={handleClickCreate}>
            Add skill
          </Button>
        </Box>
        <SkillsList />
        {createModal.isOpen && (
          <CreateSkillModal isOpen={createModal.isOpen} onClose={createModal.toggle} />
        )}
      </PagePanel>
    </>
  );
};

export default Skills;
