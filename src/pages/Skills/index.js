import React from 'react';
import Typography from '@mui/material/Typography';
import {Button} from '@mui/material';

import PageTitle from '../../components/PageTitle';
import {PagePanel} from '../../components/PagePanel';

import CreateSkillModal from '../../components/Skills/CreateSkillModal';
import {useModal} from '../../hooks/hooks';

const Skills = () => {
  const createModal = useModal();

  const handleClickCreate = () => {
    createModal.toggle();
  };

  return (
    <>
      <PageTitle title="Skills" />
      <Typography variant="h4" component="h1" margin="24px 0">
        Skills
      </Typography>

      <PagePanel>
        Skills list
        <Button variant="contained" onClick={handleClickCreate}>
          Add skill
        </Button>
        {createModal.isOpen && (
          <CreateSkillModal isOpen={createModal.isOpen} onClose={createModal.toggle} />
        )}
      </PagePanel>
    </>
  );
};

export default Skills;
