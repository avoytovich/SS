import React from 'react';
import {ErrorBoundary} from 'react-error-boundary';

import {PermissionEnum} from 'constants/permissions';
import useModal from 'hooks/useModal';
import PageLayout from 'components/Common/Layout/PageLayout';
import {ButtonContained} from 'components/Button';
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
      // TODO Refactor to avoid passing an array, as it forces setting up "key" properties that look redundant in this use case
      extra={
        hasPermissions([PermissionEnum.SKILLS_CREATE])
          ? [
              <ButtonContained key="skill-page-create-btn" onClick={handleClickCreate}>
                Create new skill
              </ButtonContained>
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
