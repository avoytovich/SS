import React from 'react';
import Typography from '@mui/material/Typography';
import {ErrorBoundary} from 'react-error-boundary';

import PageTitle from '../../components/PageTitle';
import {PagePanel} from '../../components/PagePanel';
import ErrorFallback from '../../components/ErrorFallback';
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
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <PagePanel>
          Skills list
          <button onClick={handleClickCreate}>Add skill</button>
          <CreateSkillModal isOpen={createModal.isOpen} onClose={createModal.toggle} />
        </PagePanel>
      </ErrorBoundary>
    </>
  );
};

export default Skills;
