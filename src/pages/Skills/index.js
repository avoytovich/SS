import React from 'react';
import Typography from '@mui/material/Typography';
import {Box, Button} from '@mui/material';

import {PagePanel} from 'components/PagePanel';
import SkillsList from 'components/Skills/SkillsList';
import CreateSkillModal from 'components/Skills/CreateSkillModal';
import {useModal} from 'hooks/useModal';
import HelmetWrapper from 'components/HelmetWrapper';
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
      <HelmetWrapper title="Skills" />
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
          {createModal.isOpen && (
            <CreateSkillModal isOpen={createModal.isOpen} onClose={createModal.toggle} />
          )}
        </PagePanel>
      </ErrorBoundary>
    </>
  );
};

export default Skills;
