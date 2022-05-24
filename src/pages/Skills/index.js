import React from 'react';
import Typography from '@mui/material/Typography';
import {Box, Button} from '@mui/material';

import PageTitle from 'components/PageTitle';
import {PagePanel} from 'components/PagePanel';

import CreateSkillModal from 'components/Skills/CreateSkillModal';
import {useModal} from 'hooks/useModal';
import SkillsList from 'components/Skills/SkillsList';
import {ErrorBoundary} from 'react-error-boundary';
import ErrorFallback from 'components/ErrorFallback';

const Skills = () => {
  const createModal = useModal();

  const handleClickCreate = () => {
    createModal.toggle();
  };

  return (
    <>
      <PageTitle title="Skills" />
      <Box
        data-testid="tag-page-box"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <Typography variant={'h4'} component="h1" margin="24px 0" data-testid="skill-page-title">
          Skills
        </Typography>

        <Button
          sx={{borderRadius: '40px'}}
          variant="contained"
          data-testid="skill-page-create-btn"
          onClick={handleClickCreate}
        >
          Create new skill
        </Button>
      </Box>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <PagePanel>
          <SkillsList />
        </PagePanel>
      </ErrorBoundary>

      {createModal.isOpen && (
        <CreateSkillModal isOpen={createModal.isOpen} onClose={createModal.toggle} />
      )}
    </>
  );
};

export default Skills;
