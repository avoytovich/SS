import React from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {Button} from '@mui/material';
import {PermissionEnum} from 'constants/permissions';

import {useModal} from 'hooks/useModal';

import PageLayout from 'components/Common/Layout/PageLayout';
import CreateSkillModal from 'components/Skills/CreateSkillModal';
import SkillsList from 'components/Skills/SkillsList';
import ErrorFallback from 'components/ErrorFallback';
import usePermissions from '../../hooks/permissions';

const Skills = () => {
  const {hasPermissions} = usePermissions();
  const createModal = useModal();

  const handleClickCreate = () => {
    createModal.toggle();
  };

  const onHandleChanges = skill => {
    createModal.setValues(skill);
    createModal.toggle();
  };

  const onClose = () => {
    createModal.setValues(null);
    createModal.toggle();
  };

  return (
    <PageLayout
      title="Skills"
      extra={
        hasPermissions([PermissionEnum.SKILLS_CREATE])
          ? [
              <Button
                sx={{borderRadius: '40px'}}
                variant="contained"
                key="skill-page-create-btn"
                data-testid="skill-page-create-btn"
                onClick={handleClickCreate}
              >
                Create new skill
              </Button>
            ]
          : []
      }
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <SkillsList onChanges={onHandleChanges} />
        {createModal.isOpen && (
          <CreateSkillModal
            isOpen={createModal.isOpen}
            onClose={onClose}
            skill={createModal.values}
          />
        )}
      </ErrorBoundary>
    </PageLayout>
  );
};

export default Skills;
